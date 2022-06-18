import prisma from '@lib/prisma'
import * as Sentry from '@sentry/nextjs'
import { ApiHandlerWithSession, withSession } from '@helpers/api/session'

type Query = {
  id: string
}

const getQuestionsHandler: ApiHandlerWithSession = async (req, res, _) => {
  const { id } = req.query as Query

  try {
    // const auth = new google.auth.OAuth2({
    //   clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    // })
    // auth.setCredentials({ refresh_token: refreshToken })

    const form = await prisma.form.findUnique({
      where: {
        publicId: id,
      },
      select: {
        _count: {
          select: {
            responses: true,
          },
        },
        publicId: true,
        name: true,
        webhookUrl: true,
        redirectUrl: true,
        questions: {
          select: {
            id: true,
            prompt: true,
            type: true,
            properties: {
              select: {
                isRequired: true,
                placeholder: true,
                maxCharacters: true,
                schedulingLink: true,
                isMaxLengthSpecified: true,
                isOtherOptionAllowed: true,
                isMultipleSelectionAllowed: true,
                order: true,
              },
            },
            options: true,
          },
        },
      },
    })

    if (!form) {
      return res.status(404).json({
        success: false,
        message: 'Not Found',
      })
    }

    // const { spreadsheetId } = form
    // const metadata = await getMetadata({ spreadsheetId, auth })
    // const questions = await getQuestionsBySheetId({ spreadsheetId, auth })

    return res.status(200).json({
      success: true,
      data: {
        ...form,
        questions: form.questions.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.id]: curr,
          }),
          {},
        ),
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

export default Sentry.withSentry(withSession(getQuestionsHandler))
