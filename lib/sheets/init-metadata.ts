import { OAuth2Client } from 'google-auth-library'
import { sheets } from './init'

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
}

export const initMetadata = async (params: Params): Promise<void> => {
  const { spreadsheetId, auth } = params

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    valueInputOption: 'RAW',
    range: 'Metadata',
    requestBody: {
      range: 'Metadata',
      values: [
        ['Title', 'Response Count'],
        ['Untitled', 0],
      ],
    },
    auth,
  })
}
