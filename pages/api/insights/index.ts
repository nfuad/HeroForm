import { NextApiHandler } from 'next'
import * as Sentry from '@sentry/nextjs'
import { withRequest } from '@lib/api-handler'
import axios from 'axios'
import prisma from '@lib/prisma'
import { PLAUSIBLE_EVENTS } from '@constants/plausible-events'

type Query = {
  publicFormId: string
}

const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY

const getFormInsightsHandler: NextApiHandler = async (req, res) => {
  const { publicFormId } = req.query as Query

  const [{ data: commonMetrics }, form] = await Promise.all([
    axios.get(
      `https://plausible.naf.is/api/v1/stats/aggregate?site_id=heroform.io&filters=event:page%3D%3D/${publicFormId}&metrics=visitors,visit_duration,pageviews`,
      {
        headers: {
          Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
        },
      },
    ),
    // axios.get(
    //   `https://plausible.naf.is/api/v1/stats/aggregate?site_id=heroform.io&filters=event:page%3D%3D/${publicFormId};event:name%3D%3D${PLAUSIBLE_EVENTS.START_FORM}&metrics=events`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
    //     },
    //   },
    // ),
    prisma.form.findUnique({
      where: {
        publicId: publicFormId,
      },
      select: {
        _count: {
          select: {
            responses: true,
          },
        },
      },
    }),
  ])

  const uniqueVisitors = commonMetrics.results.visitors.value
  const visitDuration = commonMetrics.results.visit_duration.value
  const views = commonMetrics.results.pageviews.value
  const responseCount = form?._count?.responses || 0
  const completionRate = views === 0 ? 'N/A' : responseCount / views

  return res.status(200).json({
    uniqueVisitors,
    visitDuration,
    responseCount,
    completionRate,
  })
}

export default Sentry.withSentry(withRequest(getFormInsightsHandler))
