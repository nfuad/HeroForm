import '../styles/globals.css'
import 'cal-sans'
import { FC } from 'react'
import type { AppProps } from 'next/app'
import SEO from '../next-seo.config'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import TrackingScripts from '@components/tracking-scripts'
import { AuthProvider } from '@lib/auth/provider'
import PlausibleProvider from 'next-plausible'
import { SITE_DATA } from '@constants/site-data'

const DynamicNextNProgress = dynamic(() => import('nextjs-progressbar'), {})
const DynamicDefaultSEO = dynamic(() =>
  import('next-seo').then((mod) => mod.DefaultSeo),
) as any
const DynamicQueryClientProvider = dynamic(
  () => import('@lib/query-client-provider'),
) as any

const PROGRESSBAR_OPTIONS = {
  color: '#b11fa8',
  startPosition: 0.3,
  stopDelayMs: 200,
  height: 3,
  showOnShallow: true,
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  const isSurveyPage = router.pathname === '/[id]'

  if (isSurveyPage) {
    return (
      <>
        <TrackingScripts />
        <DynamicDefaultSEO {...SEO} />
        <Component {...pageProps} />
      </>
    )
  }

  return (
    <PlausibleProvider
      trackLocalhost
      selfHosted
      customDomain="https://heroform.io"
      domain={SITE_DATA.domain}
    >
      <TrackingScripts />
      <DynamicNextNProgress {...PROGRESSBAR_OPTIONS} />
      <DynamicDefaultSEO {...SEO} />
      <DynamicQueryClientProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </DynamicQueryClientProvider>
    </PlausibleProvider>
  )
}

export default MyApp
