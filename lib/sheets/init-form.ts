import { OAuth2Client } from 'google-auth-library'
import { sheets_v4 } from 'googleapis'
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport'
import { sheets } from './init'

type Params = {
  auth: OAuth2Client
}

export const initForm = async (
  params: Params,
): Promise<GaxiosPromise<sheets_v4.Schema$Spreadsheet>> => {
  const { auth } = params

  return sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Inquire Form',
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
        {
          properties: {
            title: 'Metadata',
          },
        },
      ],
    },
    auth,
  })
}
