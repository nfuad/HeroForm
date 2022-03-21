// DEFAULT SEO CONFIG

import { SITE_DATA } from './constants/site-data'

export default {
  title: SITE_DATA.title,
  description: SITE_DATA.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_DATA.canonical_url,
    site_name: SITE_DATA.title,
  },
  twitter: {
    handle: SITE_DATA.twitter_user,
    site: `@${SITE_DATA.domain}`,
    cardType: 'summary_large_image',
  },
}
