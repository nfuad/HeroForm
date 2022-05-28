import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import * as Sentry from '@sentry/nextjs'

const getFormHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    const { email } = session.user || {}

    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const { forms = [] } = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        forms: {
          select: {
            _count: {
              select: {
                responses: true,
              },
            },
            id: true,
            name: true,
            publicId: true,
          },
        },
      },
    })

    // const auth = new google.auth.OAuth2({
    //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // })
    // auth.setCredentials({ refresh_token: refreshToken })

    // const formsWithMetadata = await Promise.all(
    //   forms.map(async (form) => ({
    //     ...form,
    //     metadata: await getMetadata({
    //       auth,
    //       spreadsheetId: form.spreadsheetId,
    //     }),
    //   })),
    // )

    res.status(200).json({
      success: true,
      forms,
    })
  } catch (error) {
    Sentry.captureException(error)
    console.error(error)
    res.status(500).json({
      success: false,
      error,
    })
  }
}

export default Sentry.withSentry(getFormHandler)
