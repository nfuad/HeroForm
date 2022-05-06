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
import { SITE_DATA } from '@constants/site-data'
import PlausibleProvider from 'next-plausible'

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
      <Script
        id="load-posthog"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('phc_3v15G8Lafkkh8YUqegXNUEpuF6dDJdyOccliIwGMgvU',{api_host:'https://app.posthog.com'})
      `,
        }}
      />
      <NextNProgress {...PROGRESSBAR_OPTIONS} />
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <PlausibleProvider
            domain={SITE_DATA.domain}
            trackLocalhost={true}
            selfHosted={false}
          >
            <Component {...pageProps} />
          </PlausibleProvider>
        </SessionProvider>
      </QueryClientProvider>
      <Toast />
    </>
  )
}

export default MyApp
