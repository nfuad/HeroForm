import prisma from '@lib/prisma'
import { getQuestionsBySheetId } from '@lib/sheets/get-questions-by-sheet-id'
import { google } from 'googleapis'

export const getFormBySurveyId = async (id: string) => {
  const form = await prisma().form.findUnique({
    where: {
      publicId: id,
    },
  })

  return form
}

export const getQuestions = async (form) => {
  const accounts = await prisma()
    .user.findUnique({
      where: {
        id: form.userId,
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

  const { spreadsheetId } = form
  const questions = await getQuestionsBySheetId({ spreadsheetId, auth })

  return Object.values(questions)
}
