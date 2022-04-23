import prisma from '@lib/prisma'
import { getMetadata } from '@lib/sheets'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

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

    const { forms = [] } = await prisma().user.findUnique({
      where: {
        email,
      },
      select: {
        forms: true,
      },
    })

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
    auth.setCredentials({ refresh_token: refreshToken })

    const formsWithMetadata = await Promise.all(
      forms.map(async (form) => ({
        ...form,
        metadata: await getMetadata({
          auth,
          spreadsheetId: form.spreadsheetId,
        }),
      })),
    )

    res.status(200).json({
      success: true,
      forms: formsWithMetadata,
    })
  } catch (error) {
    console.error({ error })
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default getFormHandler
