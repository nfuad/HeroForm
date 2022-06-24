import * as Sentry from '@sentry/nextjs'
import { NextApiHandler } from 'next'
import axios from 'axios'

const PLAUSIBLE_TOKEN = process.env.PLAUSIBLE_API_KEY
const PLAUSIBLE_SITE_ID = process.env.PLAUSIBLE_SITE_ID

const getPlausibleInsightsHandler: NextApiHandler = async (req, res) => {
  // return
  //   'https://plausible.io/api/v1/stats/aggregate?site_id=$SITE_ID&period=6mo&metrics=visitors,pageviews,bounce_rate,visit_duration'

  const { data } = await axios.get(
    `https://plausible.io/api/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=1mo&metrics=visitors,pageviews,bounce_rate,visit_duration`,
    {
      headers: {
        Authorization: `Bearer ${PLAUSIBLE_TOKEN}`,
      },
    },
  )
}

export default Sentry.withSentry(getPlausibleInsightsHandler)
