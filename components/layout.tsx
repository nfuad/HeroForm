import { FC, HTMLAttributes } from 'react'
import { NextSeo } from 'next-seo'

import { SITE_DATA } from '@constants/site-data'

type Props = {
  title?: string
}

type LayoutProps = Props & HTMLAttributes<HTMLElement>

const Layout: FC<LayoutProps> = ({ children, title, ...props }) => {
  const pageTitle = title ? `${title} | ${SITE_DATA.title}` : SITE_DATA.title

  return (
    <>
      <NextSeo
        title={pageTitle}
        canonical={SITE_DATA.canonical_url}
        description={SITE_DATA.description}
        twitter={{
          handle: SITE_DATA.twitter_user,
        }}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: SITE_DATA.canonical_url,
          site_name: SITE_DATA.title,
        }}
      />
      <div>
        <main {...props}>{children}</main>
      </div>
    </>
  )
}

export default Layout
