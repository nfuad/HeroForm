import '../styles/globals.css'
import 'cal-sans'
import { FC } from 'react'
import type { AppProps } from 'next/app'
import SEO from '../next-seo.config'
import Script from 'next/script'
import { SITE_DATA } from '@constants/site-data'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const DynamicNextNProgress = dynamic(() => import('nextjs-progressbar'), {})
const DynamicDefaultSEO = dynamic(() =>
  import('next-seo').then((mod) => mod.DefaultSeo),
) as any
const DynamicSessionProvider = dynamic(() =>
  import('next-auth/react').then((mod) => mod.SessionProvider),
) as any
const DynamicQueryClientProvider = dynamic(
  () => import('@lib/query-client-provider'),
) as any
const DynamicPlausibleProvider = dynamic(() => import('next-plausible')) as any

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
        <DynamicDefaultSEO {...SEO} />
        <DynamicPlausibleProvider
          domain={SITE_DATA.domain}
          trackLocalhost={true}
          selfHosted={false}
        >
          <Component {...pageProps} />
        </DynamicPlausibleProvider>
      </>
    )
  }

  return (
    <>
      <Script
        defer
        id="plausible"
        strategy="afterInteractive"
        src="https://plausible.naf.is/js/plausible.js"
        data-domain={SITE_DATA.domain}
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
      <DynamicNextNProgress {...PROGRESSBAR_OPTIONS} />
      <DynamicDefaultSEO {...SEO} />
      <DynamicQueryClientProvider>
        <DynamicSessionProvider session={pageProps.session} refetchInterval={0}>
          {/* <DynamicPlausibleProvider
            selfHosted
            domain={SITE_DATA.domain}
            trackLocalhost={process.env.NEXT_PUBLIC_PLAUSIBLE_TRACK_LOCALHOST}
            enabled={process.env.NODE_ENV === 'production'}
            scriptProps={{
              src: 'https://plausible.naf.is/js/plausible.js',
            }}
          > */}
          <Component {...pageProps} />
          {/* </DynamicPlausibleProvider> */}
        </DynamicSessionProvider>
      </DynamicQueryClientProvider>
    </>
  )
}

export default MyApp
