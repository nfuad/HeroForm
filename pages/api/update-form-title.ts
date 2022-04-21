import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'
import { updateMetadata } from '@lib/sheets'

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

    const form = await prisma().form.findUnique({
      where: {
        publicId: id,
      },
    })
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      })
    }

    const accounts = await prisma()
      .user.findUnique({
        where: {
          email,
        },
      })
      .accounts()

    const account = accounts[0]
    const refreshToken = account.refresh_token

    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    })

    auth.setCredentials({
      refresh_token: refreshToken,
    })

    const { spreadsheetId } = form
    const metadata = { title }

    await updateMetadata({ auth, metadata, spreadsheetId })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error({ error })
    console.log(error.response.data)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default publishFormHandler
