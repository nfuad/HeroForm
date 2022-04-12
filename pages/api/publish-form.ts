import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'
import type { Question } from '@components/admin/editor/types'

const sheets = google.sheets('v4')

const headers = ['ID', 'Prompt', 'Type', 'Options', 'Properties']
const indexes: Record<keyof any, number> = {
  id: 0,
  prompt: 1,
  type: 2,
  options: 3,
  properties: 4,
}

const parseQuestions = (questions: any): string[][] => {
  return Object.values(questions).map((question) => {
    const row = Array(headers.length)

    Object.keys(question).forEach((key) => {
      const index = indexes[key]
      row[index] = JSON.stringify(question[key])
    })

    return row
  })
}

type Body = {
  id: string
  questions: any
}
const publishFormHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { questions, id }: Body = req.body

  if (!questions || !id) {
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

    auth.setCredentials({
      refresh_token: refreshToken,
    })

    const { spreadsheetId } = form

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      valueInputOption: 'RAW',
      range: 'Questions',
      requestBody: {
        range: 'Questions',
        values: [headers, ...parseQuestions(questions)],
      },
      auth,
    })

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
