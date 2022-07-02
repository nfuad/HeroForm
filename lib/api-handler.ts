import * as Sentry from '@sentry/nextjs'
import { NextApiHandler } from 'next'

export const handleRequest = async (req, res, callback: NextApiHandler) => {
  try {
    return await callback(req, res)
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)

    return res.status(error.status || 500).json({
      error: error.message,
    })
  }
}

export const withRequest =
  (callback: NextApiHandler): NextApiHandler =>
  async (req, res) =>
    await handleRequest(req, res, callback)
