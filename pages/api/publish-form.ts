import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'
import * as Sentry from '@sentry/nextjs'

// const sheets = google.sheets('v4')

// const headers = ['ID', 'Prompt', 'Type', 'Options', 'Properties']
// const indexes: Record<keyof any, number> = {
//   id: 0,
//   prompt: 1,
//   type: 2,
//   options: 3,
//   properties: 4,
// }

// const parseQuestions = (questions: any): string[][] => {
//   return Object.values(questions).map((question) => {
//     const row = Array(headers.length)

//     Object.keys(question).forEach((key) => {
//       const index = indexes[key]
//       row[index] = JSON.stringify(question[key])
//     })

//     return row
//   })
// }

type Body = {
  id: string
  questions: Record<string, any>
}
const publishFormHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { questions, id: publicId }: Body = req.body

  if (!questions || !publicId) {
    return res.status(422).json({
      success: false,
      message: 'Unprocessable Entity',
    })
  }

  try {
    const session = await getSession({ req })
    const { email } = session.user || {}

    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    await Promise.all(
      Object.entries(questions).map(
        async ([id, { properties, ...question }]) => {
          await prisma.form.update({
            where: {
              publicId,
            },
            data: {
              questions: {
                upsert: {
                  where: {
                    id,
                  },
                  create: {
                    ...question,
                    properties: {
                      create: {
                        ...properties,
                      },
                    },
                  },
                  update: {
                    ...question,
                    properties: {
                      update: {
                        ...properties,
                      },
                    },
                  },
                },
              },
            },
          })
        },
      ),
    )

    // const auth = new google.auth.OAuth2({
    //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // })

    // auth.setCredentials({
    //   refresh_token: refreshToken,
    // })

    // await sheets.spreadsheets.values.clear({
    //   spreadsheetId,
    //   range: 'Questions',
    //   auth,
    // })

    // await sheets.spreadsheets.values.update({
    //   spreadsheetId,
    //   valueInputOption: 'RAW',
    //   range: 'Questions',
    //   requestBody: {
    //     range: 'Questions',
    //     values: [headers, ...parseQuestions(questions)],
    //   },
    //   auth,
    // })

    // await sheets.spreadsheets.values.append({
    //   spreadsheetId,
    //   valueInputOption: 'RAW',
    //   range: 'Responses',
    //   requestBody: {
    //     range: 'Responses',
    //     values: [
    //       [...Object.values(questions).map(({ prompt }) => prompt), 'Metadata'],
    //     ],
    //   },
    //   auth,
    // })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    Sentry.captureException(error)
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default Sentry.withSentry(publishFormHandler)
