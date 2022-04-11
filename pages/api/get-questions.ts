import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import { getQuestionsBySheetId } from '@lib/sheets/get-questions-by-sheet-id'

type Query = {
  id: string
}

const getQuestionsHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { id } = req.query as Query

  if (!id) {
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

    const accounts = await prisma.user
      .findUnique({
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

    const form = await prisma.form.findUnique({
      where: {
        id,
      },
    })

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      })
    }

    const { spreadsheetId } = form
    const questions = await getQuestionsBySheetId({ spreadsheetId, auth })

    return res.status(200).json({
      success: true,
      questions,
    })
  } catch (error) {
    console.error({ error })
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}

export default getQuestionsHandler
