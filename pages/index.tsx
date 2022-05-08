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
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    ;(async function () {
      const ScrollReveal = (await import('scrollreveal')).default
      ScrollReveal({ reset: true }).reveal('div')
      ScrollReveal({ reset: true }).reveal('h1')
      ScrollReveal({ reset: true }).reveal('h2')
      ScrollReveal({ reset: true }).reveal('footer')
      ScrollReveal({ reset: true }).reveal('header')
      ScrollReveal({ reset: true }).reveal('button')
    })()
  }, [])

  return (
    <Layout className="reveal-on-scroll" showHeader showFooter>
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
