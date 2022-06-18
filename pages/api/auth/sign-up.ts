import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'

import { auth } from '@lib/init-firebase-admin'
import prisma from '@lib/prisma'

type Body = {
  uid: string
  accessToken?: string
}

const signUpHandler: NextApiHandler = async (req, res) => {
  const { uid, accessToken } = req.body as Body

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: 'Bad request',
    })
  }

  try {
    const { displayName, email, emailVerified, photoURL } = await auth.getUser(
      uid,
    )
    await prisma.user.create({
      data: {
        name: displayName,
        image: photoURL,
        email,
        emailVerified,
        accessToken,
      },
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.log({ error })
    Sentry.captureException(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export default Sentry.withSentry(signUpHandler)
