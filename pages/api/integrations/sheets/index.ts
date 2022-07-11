import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'
import { withRequest } from '@lib/api-handler'
import { ROUTES } from '@constants/routes'
import { google } from 'googleapis'
import { isDevEnv } from '@utils/is-dev-env'
import prisma from '@lib/prisma'
import { initForm } from '@lib/sheets'

type Query = {
  state: string
  code: string
  error: string
}

const sheetsIntegrationHandler: NextApiHandler = async (req, res) => {
  const { state, error, code } = req.query as Query

  if (!state || error) {
    return res.status(307).redirect(ROUTES.DASHBOARD)
  }

  // parse state from base64 string to json
  const { publicFormId } = JSON.parse(Buffer.from(state, 'base64').toString())
  if (!publicFormId) {
    return res.status(307).redirect(ROUTES.DASHBOARD)
  }

  if (!code) {
    return res.status(307).redirect(`/${publicFormId}${ROUTES.SETTINGS}`)
  }

  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_OAUTH_CLIENT_ID,
    process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    `${
      isDevEnv() ? 'http://localhost:3001' : 'https://heroform.io'
    }/api/integrations/sheets`,
  )
  const { tokens } = await auth.getToken(code)

  const { refresh_token } = tokens

  const sheetsAuth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  })

  sheetsAuth.setCredentials({
    refresh_token,
  })

  // create a google sheet to store the corresponding form responses in the future
  const {
    data: { spreadsheetId },
  } = await initForm({ auth: sheetsAuth })

  await prisma.form.update({
    where: {
      publicId: publicFormId,
    },
    data: {
      sheetsIntegration: {
        create: {
          refreshToken: refresh_token,
          spreadsheetId,
        },
      },
    },
  })

  const redirectUrl = `${
    isDevEnv() ? 'http://localhost:3001' : 'https://heroform.io'
  }/${publicFormId}${ROUTES.SETTINGS}`

  return res.redirect(redirectUrl)
}

export default Sentry.withSentry(withRequest(sheetsIntegrationHandler))
