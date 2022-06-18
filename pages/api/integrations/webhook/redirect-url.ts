import { ApiHandlerWithSession, withSession } from '@helpers/api/session'
import prisma from '@lib/prisma'

type Body = {
  redirectUrl: string
  publicId: string
}

const setRedirectUrlHandler: ApiHandlerWithSession = async (req, res, _) => {
  const { redirectUrl, publicId } = req.body as Body

  if (!redirectUrl || !publicId) {
    return res.status(400).json({
      success: false,
      message: 'Bad request',
    })
  }

  try {
    await prisma.form.update({
      where: {
        publicId,
      },
      data: {
        redirectUrl,
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

export default withSession(setRedirectUrlHandler)
