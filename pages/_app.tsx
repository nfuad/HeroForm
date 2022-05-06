import '../styles/globals.css'
import 'cal-sans'
import { FC } from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'
import Toast from '@components/toast'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`)
  return data
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

const PROGRESSBAR_OPTIONS = {
  color: '#b11fa8',
  startPosition: 0.3,
  stopDelayMs: 200,
  height: 3,
  showOnShallow: true,
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_DATA_WEBSITE_ID}
        src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
      />
      <NextNProgress {...PROGRESSBAR_OPTIONS} />
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
      <Toast />
    </>
  )
}

export default MyApp
