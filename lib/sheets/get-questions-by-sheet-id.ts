import { Question } from '@components/admin/editor/types'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'

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

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
}

export const getQuestionsBySheetId = async (
  params: Params,
): Promise<Question[]> => {
  const { spreadsheetId, auth } = params
  const sheets = google.sheets('v4')

  const {
    data: { values },
  } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Questions',
    auth,
  })

  return parseValues(values)
}
