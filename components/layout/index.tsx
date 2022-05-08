import { FC, HTMLAttributes } from 'react'
import { NextSeo } from 'next-seo'
import { SITE_DATA } from '@constants/site-data'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import toast from 'react-hot-toast'
import { Container } from '@components/auth-screens'
import { Loader } from '@components/loader'
import { Header } from './header'
import { Footer } from './footer'

type Props = {
  title?: string
  showHeader?: boolean
  showFooter?: boolean
  isProtected?: boolean
}

type LayoutProps = Props & HTMLAttributes<HTMLElement>

const Layout: FC<LayoutProps> = ({
  children,
  title,
  showHeader = false,
  showFooter = false,
  isProtected = false, // for protected routes like admin
}) => {
  const router = useRouter()
  const { status } = useSession({
    required: isProtected,
    onUnauthenticated: () => {
      toast.error('You must be signed in to continue')
      router.push(ROUTES.CONTINUE)
    },
  })

  const isLoading = status === 'loading'
  const isUnauthenticated = status === 'unauthenticated'

  if (isProtected) {
    if (isLoading) {
      return (
        <Container>
          <Loader />
        </Container>
      )
    }
    if (isUnauthenticated) return null
  }

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
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
