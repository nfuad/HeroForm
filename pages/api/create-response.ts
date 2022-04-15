import prisma from '@lib/prisma'
import { NextApiHandler } from 'next'
import { google } from 'googleapis'
import { createResponse, getMetadata, updateMetadata } from '@lib/sheets'

type Body = {
  id: string
  responses: Record<string, string>
}

const createResponseHandler: NextApiHandler = async (req, res) => {
  const { id, responses }: Body = req.body

  if (!id) {
    return res.status(422).json({
      success: false,
      message: 'Unprocessable Entity',
    })
  }

  try {
    const form = await prisma.form.findUnique({
      where: {
        publicId: id,
      },
      include: {
        user: {
          include: {
            accounts: true,
          },
        },
      },
    })
    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      })
    }

    const account = form.user.accounts[0]
    const refreshToken = account.refresh_token

    const auth = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    })

    auth.setCredentials({
      refresh_token: refreshToken,
    })

    const { spreadsheetId } = form

    await createResponse({ auth, spreadsheetId, responses })
    const metadata = await getMetadata({ auth, spreadsheetId })
    await updateMetadata({
      auth,
      spreadsheetId,
      metadata: {
        responseCount: metadata.responseCount + 1,
      },
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error({ error })
    console.log(error.response.data)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default createResponseHandler
