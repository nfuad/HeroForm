import { FC, HTMLAttributes, useEffect } from 'react'
import { NextSeo } from 'next-seo'
import { SITE_DATA } from '@constants/site-data'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import toast from 'react-hot-toast'
import { Container } from '@components/auth-screens'
import { Loader } from '@components/loader'
import { Header } from './header'
import { Footer } from './footer'
import { useAuth } from '@lib/auth/provider'

type Props = {
  title?: string
  showHeader?: boolean
  showFooter?: boolean
  isProtected?: boolean
  handleNewFormClick?: any
}

type LayoutProps = Props & HTMLAttributes<HTMLElement>

const Layout: FC<LayoutProps> = ({
  children,
  title,
  showHeader = false,
  showFooter = false,
  isProtected = false, // for protected routes like admin
  handleNewFormClick = () => {},
}) => {
  const router = useRouter()
  const { isLoggedOut, isAuthUnknown } = useAuth()

  useEffect(() => {
    if (isProtected) {
      if (isLoggedOut) {
        router.push(ROUTES.CONTINUE)
      }
    }
  }, [isLoggedOut, isProtected, router])

  if (isProtected) {
    if (isAuthUnknown) {
      return (
        <Container>
          <Loader />
        </Container>
      )
    }
    if (isLoggedOut) return null
  }

  const pageTitle = title ? `${title} | ${SITE_DATA.title}` : SITE_DATA.title

  return (
    <div className="h-screen">
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
      {showHeader && <Header handleNewFormClick={handleNewFormClick} />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}

export default Layout
