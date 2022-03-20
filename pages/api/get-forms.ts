import prisma from '@lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

const getFormHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req })
    const { email } = session.user || {}

    if (!email) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    const { forms = [] } = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        forms: true,
      },
    })

    res.status(200).json({
      success: true,
      forms,
    })
  } catch (error) {
    console.error({ error })
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

export default getFormHandler
