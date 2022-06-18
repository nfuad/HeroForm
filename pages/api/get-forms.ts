import prisma from '@lib/prisma'
import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'

type Query = {
  email: string
}

const getFormsHandler: NextApiHandler = async (req, res) => {
  try {
    const { email } = req.query as Query
    console.log({ email })
    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const user = await prisma.user.findUnique({
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

    console.log(user)

    const { forms = [] } = user

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

    return res.status(200).json({
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

export default Sentry.withSentry(getFormsHandler)
