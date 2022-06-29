import { handleRequest } from '@lib/api-handler'
import { NextApiHandler } from 'next'
import prisma from '@lib/prisma'

type Query = {
  publicFormId: string
}

const callback: NextApiHandler = async (req, res) => {
  const { publicFormId } = req.query as Query

  const form = await prisma.form.findUnique({
    where: {
      publicId: publicFormId,
    },
    select: {
      slackIntegration: {
        select: {
          id: true,
        },
      },
    },
  })

  return res.status(200).json({
    success: true,
    data: {
      slack: !!form.slackIntegration,
      sheets: false,
    },
  })
}

const handler = (req, res) => handleRequest(req, res, callback)

export default handler
