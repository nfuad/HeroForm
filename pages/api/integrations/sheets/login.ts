import { google } from 'googleapis'
import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'

import { withRequest } from '@lib/api-handler'
import { isDevEnv } from '@utils/is-dev-env'
import { ROUTES } from '@constants/routes'

type Query = {
  publicFormId: string
}

const sheetsLoginHandler: NextApiHandler = async (req, res) => {
  const { publicFormId } = req.query as Query

  const redirectUrl = `${
    isDevEnv() ? 'http://localhost:3000' : 'https://heroform.io'
  }/api/integrations/sheets`
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirectUrl,
  )

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/userinfo.email',
  ]

  // convert state to base64 string as required by google oauth
  const state = Buffer.from(
    JSON.stringify({
      publicFormId,
    }),
    'binary',
  ).toString('base64')

  const authUrl = auth.generateAuthUrl({
    // offline mode so we can access data on behalf of the user, even when
    // the user is offline, using the refresh token, ie. we'll get a everlasting
    // refresh token
    access_type: 'offline',
    scope: scopes,
    state,

    // refresh token is only returned every time the user is prompted for
    // consent.
    // see https://github.com/googleapis/google-api-nodejs-client/issues/750
    prompt: 'consent',
  })

  res.status(200).json({
    success: true,
    authUrl,
  })
}

export default Sentry.withSentry(withRequest(sheetsLoginHandler))
