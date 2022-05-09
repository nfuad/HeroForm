import Layout from '@components/layout'
import {
  Heading,
  SeeDemoButton,
  Video,
  HowItWorks,
  // Testimonials,
  LastCTA,
  Features,
  Integrations,
} from '@components/home'
import { useEffect } from 'react'

const HomePage = () => {
  useEffect(() => {
    ;(async function () {
      const ScrollReveal = (await import('scrollreveal')).default
      ScrollReveal().reveal('div')
      ScrollReveal().reveal('h1')
      ScrollReveal().reveal('h2')
      ScrollReveal().reveal('footer')
      ScrollReveal().reveal('header')
      ScrollReveal().reveal('button')
    })()
  }, [])

  return (
    <Layout className="reveal-on-scroll" showHeader showFooter>
      <Heading />
      <SeeDemoButton />
      <Video />
      <HowItWorks />
      <Features />
      {/* <Testimonials /> */}
      <Integrations />
      <LastCTA />
    </Layout>
  )
}

export default HomePage
