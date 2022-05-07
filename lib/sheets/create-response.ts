import { OAuth2Client } from 'google-auth-library'
import { sheets } from './init'

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
  responses: Record<string, string>
}

export const createResponse = async (params: Params): Promise<void> => {
  const { spreadsheetId, auth, responses } = params

  const metadata = {
    createdAt: new Date().toISOString(),
  }
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    valueInputOption: 'RAW',
    range: 'Responses',
    requestBody: {
      range: 'Responses',
      values: [[...Object.values(responses), JSON.stringify(metadata)]],
    },
    auth,
  })
}
