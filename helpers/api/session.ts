import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

export type ApiHandlerWithSession = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session,
) => unknown | Promise<unknown>

export const withSession =
  (handler: ApiHandlerWithSession): NextApiHandler =>
  async (req, res) => {
    try {
      const session = await getSession({ req })
      const { email } = session.user || {}

      if (!email) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        })
      }

      // propagate the request to the next api handler/middleware
      handler(req, res, session)
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      })
    }
  }
