import prisma from '@lib/prisma'
import { NextApiHandler } from 'next'

type Body = {
  redirectUrl: string
  webhookUrl: string
  id: string
}

const updateWebhookIntegrationURLsHandler: NextApiHandler = async (
  req,
  res,
) => {
  const { redirectUrl, webhookUrl, id } = req.body as Body

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Bad request',
    })
  }

  try {
    await prisma.form.update({
      where: {
        publicId: id,
      },
      data: {
        redirectUrl,
        webhookUrl,
      },
    })

    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export default updateWebhookIntegrationURLsHandler
