import prisma from '@lib/prisma'
import * as Sentry from '@sentry/nextjs'
import { NextApiHandler } from 'next'

type Query = {
  id: string
}

const getWebhookIntegrationURLsHandler: NextApiHandler = async (req, res) => {
  const { id } = req.query as Query

  try {
    const { webhookUrl, redirectUrl } = await prisma.form.findUnique({
      where: {
        publicId: id,
      },
      select: {
        webhookUrl: true,
        redirectUrl: true,
      },
    })

    return res.status(200).json({
      success: true,
      data: {
        webhookUrl,
        redirectUrl,
      },
    })
  } catch (error) {
    Sentry.captureException(error)
    console.error({ error })
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}

export default Sentry.withSentry(getWebhookIntegrationURLsHandler)
