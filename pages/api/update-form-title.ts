import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'

type Body = {
  id: string
  title: string
}
const publishFormHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { title, id }: Body = req.body

  if (!title || !id) {
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

    await prisma.form.update({
      data: {
        name: title,
      },
      where: {
        publicId: id,
      },
    })

    //     const auth = new google.auth.OAuth2({
    //       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    //     })

    //     auth.setCredentials({
    //       refresh_token: refreshToken,
    //     })

    // await updateMetadata({ auth, metadata, spreadsheetId })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default publishFormHandler
