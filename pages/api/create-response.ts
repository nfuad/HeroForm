import prisma from '@lib/prisma'
import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { google } from 'googleapis'
import { createResponse } from '@lib/sheets'

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

    // @ts-ignore
    const { slackIntegration, sheetsIntegration, name, webhookUrl } =
      await prisma.form.findUnique({
        where: {
          publicId: id,
        },
        include: {
          slackIntegration: {
            select: {
              webhookUrl: true,
            },
          },
          // @ts-ignore
          sheetsIntegration: {
            select: {
              refreshToken: true,
              spreadsheetId: true,
            },
          },
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

    if (slackIntegration) {
      const questions = await prisma.question.findMany({
        where: {
          id: {
            in: Object.keys(responses),
          },
        },
        select: {
          id: true,
          prompt: true,
        },
      })

      const blocks = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Someone just submitted to your form *${name}*`,
          },
        },
        ...questions.map(({ id, prompt }) => ({
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${prompt}\n*${responses[id]}*`,
          },
        })),
      ]
      const data = {
        blocks,
      }
      await axios.post(slackIntegration.webhookUrl, data)
    }

    if (sheetsIntegration) {
      const { refreshToken, spreadsheetId } = sheetsIntegration

      const auth = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      })

      auth.setCredentials({
        refresh_token: refreshToken,
      })

      await createResponse({ auth, spreadsheetId, responses })
    }

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
