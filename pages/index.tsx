import Layout from '@components/layout'
import {
  Heading,
  SubHeading,
  QuickFacts,
  SeeDemoButton,
  Video,
  HowItWorks,
  Testimonials,
  SelfHosting,
  LastCTA,
} from '@components/home'

const HomePage = () => {
  return (
    <Layout showHeader showFooter>
      <Heading />
      <SubHeading />
      <QuickFacts />
      <SeeDemoButton />
      <Video />
      <HowItWorks />
      <Testimonials />
      <SelfHosting />
      <LastCTA />
    </Layout>
  )
}

export default HomePage
