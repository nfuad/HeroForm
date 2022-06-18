import { NextApiHandler } from 'next'
import prisma from '@lib/prisma'
import { nanoid } from 'nanoid'
import * as Sentry from '@sentry/nextjs'

const FORM_ID_LENGTH = 8

type Body = {
  email: string
}
const createFormHandler: NextApiHandler = async (req, res) => {
  try {
    const { email } = req.body as Body
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
        id: true,
      },
    })

    // const auth = new google.auth.OAuth2({
    //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // })

    // auth.setCredentials({
    //   refresh_token: refreshToken,
    // })

    // const response = await initForm({ auth })
    // const { spreadsheetId } = response.data
    // await initMetadata({ auth, spreadsheetId })

    const publicId = nanoid(FORM_ID_LENGTH)

    await prisma.form.create({
      data: {
        publicId,
        userId: user.id,
        name: 'Untitled',
      },
    })

    return res.status(200).json({
      success: true,
      publicId,
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

export default Sentry.withSentry(createFormHandler)
