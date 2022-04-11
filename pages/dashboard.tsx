import { NextPage } from 'next'
import { Container, Loader } from '@components/continue'
import Layout from '@components/layout'
import Dashboard from '@components/dashboard'

const DashboardPage: NextPage = () => (
  <Layout isProtected title="Dashboard">
    <Container>
      <Dashboard />
    </Container>
  </Layout>
)

export default DashboardPage
