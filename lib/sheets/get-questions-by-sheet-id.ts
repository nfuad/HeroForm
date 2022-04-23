import { Question } from '@components/admin/editor/types'
import { OAuth2Client } from 'google-auth-library'
import { sheets } from './init'

const indexes: Record<keyof any, number> = {
  id: 0,
  prompt: 1,
  type: 2,
  options: 3,
  properties: 4,
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
const parseValues = (values: string[][]): any => {
  if (!values) return {}
  return (
    values
      .slice(1)
      .map(parseRow)
      .reduce((acc, curr) => {
        const { id } = curr
        return {
          ...acc,
          [id]: curr,
        }
      }, {}) || {}
  )
}

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
}

export const getQuestionsBySheetId = async (
  params: Params,
): Promise<Question[]> => {
  const { spreadsheetId, auth } = params

  const {
    data: { values },
  } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Questions',
    auth,
  })

  return parseValues(values)
}
