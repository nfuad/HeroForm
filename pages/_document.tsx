import Document, { Html, Head, Main, NextScript } from 'next/document'
import Meta from '@components/meta'
import { CssBaseline } from '@nextui-org/react'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [<>{initialProps.styles}</>],
    }
  }
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <Meta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
