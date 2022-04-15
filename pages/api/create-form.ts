import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import prisma from '@lib/prisma'
import { getSession } from 'next-auth/react'
import { nanoid } from 'nanoid'

const sheets = google.sheets('v4')

const createFormHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    const { email } = session.user || {}
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
        accounts: true,
      },
    })

    const { accounts } = user
    const account = accounts[0]
    const refreshToken = account.refresh_token

    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    })

    auth.setCredentials({
      refresh_token: refreshToken,
    })

    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'please workkkkkkkkkkkkkkkkkk',
        },
        sheets: [
          {
            properties: {
              title: 'Questions',
            },
          },
          {
            properties: {
              title: 'Responses',
            },
          },
        ],
      },
      auth,
    })
    const { spreadsheetId } = response.data
    const { id } = await prisma.form.create({
      data: {
        spreadsheetId,
        publicId: nanoid(8),
        userId: user.id,
      },
    })

    return res.status(200).json({
      success: true,
      id,
    })
  } catch (error) {
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default createFormHandler
