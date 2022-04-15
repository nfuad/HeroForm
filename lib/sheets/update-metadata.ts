import { OAuth2Client } from 'google-auth-library'
import { sheets } from './init'

type Metadata = {
  title?: string
  responseCount?: string
}

type Params = {
  spreadsheetId: string
  auth: OAuth2Client
  metadata: Metadata
}

const getRange = (metadata: Metadata) => {
  if (!metadata.title && !metadata.responseCount)
    throw new Error('Missing title or responseCount')
  if (!metadata.title) return 'Metadata!B2:B2'
  if (!metadata.responseCount) return 'Metadata!A2:A2'
  return 'Metadata!A2:B2'
}

export const updateMetadata = async (params: Params): Promise<void> => {
  const { spreadsheetId, auth, metadata } = params

  const range = getRange(metadata)
  const values = [
    [
      ...(metadata.title ? [metadata.title] : []),
      ...(metadata.responseCount ? [metadata.responseCount] : []),
    ],
  ]

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    valueInputOption: 'RAW',
    range,
    requestBody: {
      range,
      values,
    },
    auth,
  })
}
