import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import prisma from '@lib/prisma'
import { Account } from '@prisma/client'
import type { Question } from '@components/admin/editor/types'

const sheets = google.sheets('v4')

const headers = ['ID', 'Prompt', 'Type', 'Required', 'Options', 'Placeholder']
const indexes: Record<keyof Question, number> = {
  id: 0,
  prompt: 1,
  type: 2,
  isRequired: 3,
  options: 4,
  placeholder: 5,
}

const parseQuestions = (questions: Question[]): string[][] => {
  return questions.map((question) => {
    const row = Array(headers.length)

    Object.keys(question).forEach((key) => {
      const index = indexes[key]
      row[index] = JSON.stringify(question[key])
    })

    return row
  })
}

type Body = {
  questions: Question[]
}
const publishFormHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { questions }: Body = req.body

  if (!questions) {
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

    const accounts: Account[] = await prisma.user
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

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      insertDataOption: 'INSERT_ROWS',
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
