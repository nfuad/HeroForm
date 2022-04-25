import Layout from '@components/layout'
import { Container, Header, Description } from '@components/not-found'

const NotFoundPage = () => {
  return (
    <Layout title="404 - Not Found">
      <Container>
        <Header />
        <Description />
      </Container>
    </Layout>
  )
}

export default NotFoundPage
