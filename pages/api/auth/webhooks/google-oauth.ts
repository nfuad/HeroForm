import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'

type Query = {
  code: string
}

const googleOAuthWebhookHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { code } = req.query as Query

  if (!code) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    })
  }

  try {
    const oauth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      // TODO: make this dynamic, or it won't work on Vercel
      redirectUri: 'http://localhost:3000/api/auth/webhooks/google-oauth',
    })

    const { tokens } = await oauth.getToken(code)

    // TODO: store the token anywhere :)
    console.log({ tokens })

    // TODO: redirect like a pro, maybe even take it from the query params
    return res.redirect('/')
  } catch (error) {
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'internal server error',
    })
  }
}

export default googleOAuthWebhookHandler
