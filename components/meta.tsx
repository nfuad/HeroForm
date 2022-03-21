import { FC } from 'react'

import { SITE_DATA as data } from '@constants/site-data'

const Meta: FC = () => {
  return (
    <>
      <link
        rel="icon"
        href="/images/favicon.ico"
        type="image/ico"
        sizes="16x16"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/favicon-16x16.png"
      />
      <link rel="manifest" href="/images/site.webmanifest" />

      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="theme-color" content="#fff" />
      <meta name="google" content="notranslate" />

      {/* OPEN GRAPH TAGS */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={data.description} />
      <meta property="og:description" content={data.description_long} />
      <meta property="og:image" content={data.image} />
      <meta property="og:url" content={data.canonical_url} />
      <meta property="og:site_name" content={data.title} />

      {/* TWITTER CARD TAGS */}
      <meta name="twitter:title" content={data.description} />
      <meta name="twitter:description" content={data.description_long} />
      <meta name="twitter:image" content={data.image} />
      <meta name="twitter:site" content={data.twitter_user} />
      <meta name="twitter:creator" content={data.twitter_user} />
    </>
  )
}

export default Meta
