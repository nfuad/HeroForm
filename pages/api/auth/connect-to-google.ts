import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

const connectToGoogleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const oauth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      // TODO: make this dynamic, or it won't work on Vercel
      redirectUri: 'http://localhost:3000/api/auth/webhooks/google-oauth',
    })

    const scopes = ['https://www.googleapis.com/auth/spreadsheets']

    const oauthURL = oauth.generateAuthUrl({
      // access type offline, meaning we're requesting access to user's data
      // even after they close the browser / are offline
      access_type: 'offline',

      // oauth scopes, in this case, we only need access to spreadsheet
      scope: scopes,

      // need to set prompt to true, otherwise the refresh token will only be
      // returned on first login, which can cause issues if the user quits in
      // the middle of the process
      prompt: 'consent',
    })

    return res.status(200).json({
      success: true,
      oauthURL,
    })
  } catch (error) {
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    })
  }
}

export default connectToGoogleHandler
