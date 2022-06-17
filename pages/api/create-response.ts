import prisma from '@lib/prisma'
import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'

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
    const responseDetailsData = Object.entries(responses).map(
      ([questionId, responseValue]) => ({
        questionId,
        value: responseValue,
      }),
    )
    await prisma.form.update({
      where: {
        publicId: id,
      },
      data: {
        responses: {
          create: {
            responseDetails: {
              createMany: {
                data: responseDetailsData,
              },
            },
          },
        },
      },
    })

    const { webhookUrl } = await prisma.form.findUnique({
      where: {
        publicId: id,
      },
    })

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: responseDetailsData,
        }),
      })
    }

    // const auth = new google.auth.OAuth2({
    //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // })

    // auth.setCredentials({
    //   refresh_token: refreshToken,
    // })

    // await createResponse({ auth, spreadsheetId, responses })
    // const metadata = await getMetadata({ auth, spreadsheetId })
    // await updateMetadata({
    //   auth,
    //   spreadsheetId,
    //   metadata: {
    //     responseCount: metadata.responseCount + 1,
    //   },
    // })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    Sentry.captureException(error)
    console.error({ error })
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default Sentry.withSentry(createResponseHandler)
