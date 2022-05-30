import * as Sentry from '@sentry/nextjs'

export const handleRequest = async (req, res, callback) => {
  try {
    return await callback(req, res)
  } catch (error) {
    Sentry.captureException(error)

    return res.status(error.status || 500).json({
      error: error.message,
    })
  }
}
