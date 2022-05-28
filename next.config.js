/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')
// const { withPlausibleProxy } = require('next-plausible')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // remove console.log in production
  },
}

// adding Sentry options should be the last code to run before exporting, to ensure
// that the source maps include changes from all other Webpack plugins
// module.exports = withSentryConfig(
//   withBundleAnalyzer(withPlausibleProxy({})(nextConfig)),
//   sentryWebpackPluginOptions,
// )
module.exports = withSentryConfig(
  withBundleAnalyzer(nextConfig),
  sentryWebpackPluginOptions,
)
