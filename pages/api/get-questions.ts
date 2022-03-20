import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getSession } from 'next-auth/react'
import { Question } from '@components/admin/editor/types'

const sheets = google.sheets('v4')
const indexes: Record<keyof Question, number> = {
  id: 0,
  prompt: 1,
  type: 2,
  isRequired: 3,
  options: 4,
  placeholder: 5,
}

const parseJSON = (value: string) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
const parseRow = (row: string[]): Question => {
  return Object.keys(indexes).reduce(
    (acc, key, index) => ({
      ...acc,
      [key]: parseJSON(row[index]),
    }),
    {},
  ) as Question
}
const parseValues = (values: string[][]): Question[] => {
  if (!values) return []
  return values.slice(1).map(parseRow) || []
}

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
    const {
      data: { values },
    } = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Questions',
      auth,
    })

    const questions = parseValues(values)

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
