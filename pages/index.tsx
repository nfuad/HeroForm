import Layout from '@components/layout'
import {
  Heading,
  SeeDemoButton,
  Video,
  HowItWorks,
  Testimonials,
  LastCTA,
  Features,
  Integrations,
} from '@components/home'

const HomePage = () => {
  return (
    <Layout showHeader showFooter>
      <Heading />
      <SeeDemoButton />
      <Video />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Integrations />
      <LastCTA />
    </Layout>
  )
}

export default HomePage
