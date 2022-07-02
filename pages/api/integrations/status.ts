import { NextApiHandler } from 'next'
import prisma from '@lib/prisma'
import { withRequest } from '@lib/api-handler'

type Query = {
  publicFormId: string
}

const handler: NextApiHandler = async (req, res) => {
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
      sheetsIntegration: {
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
      sheets: !!form.sheetsIntegration,
    },
  })
}

export default withRequest(handler)
