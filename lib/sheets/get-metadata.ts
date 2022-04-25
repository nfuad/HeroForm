import { OAuth2Client } from 'google-auth-library'
import { sheets } from './init'

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
}

type Returns = {
  title: string
  responseCount: number
}

export const getMetadata = async (params: Params): Promise<Returns> => {
  const { spreadsheetId, auth } = params

  const {
    data: { values },
  } = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Metadata!A2:B2',
    auth,
  })

  return {
    title: values[0][0],
    responseCount: parseInt(values[0][1]),
  }
}
