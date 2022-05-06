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
import Image from 'next/image'
import { ROUTES } from '@constants/routes'
import Link from 'next/link'
import { SITE_DATA } from '@constants/site-data'

const HomePage = () => {
  return (
    <Layout showHeader showFooter>
      <Heading />
      <SeeDemoButton />
      {/* <SubHeading /> */}
      {/* <QuickFacts /> */}
      <Video />
      <HowItWorks />
      <div className="bg-[#FAFAFA] shadow-sm py-14 px-5 md:py-32 lg:py-40 flex flex-col justify-center items-center lg:my-20">
        <div className="max-w-4xl mx-auto mb-8 md:mb-16 lg:mb-24">
          {/* <h2 className="leading-9 text-center text-[26px] sm:text-4xl md:text-5xl xl:leading-[1.4]"> */}
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl max-w-sm md:max-w-full lg:text-7xl text-black leading-[1.4]">
            No more <span>pricey&nbsp;💸 </span> , <span>bloated&nbsp;😫</span>,{' '}
            <span>ugly&nbsp;🤮</span> forms.
            <style jsx>{`
              span {
                padding: 0.25rem 0.5rem;
                border-radius: 0.2em;
                background: #ffe5d3;
                position: relative;
              }
            `}</style>
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-5xl space-y-8">
          <div className="flex flex-col items-center justify-center w-full gap-y-4 md:flex-row gap-x-9">
            <Section
              type="narrow"
              heading="Free (costs $0) 🤯"
              subHeading="We don't charge you to use our platform. We're just indie hackers who love to make things."
              renderBody={() => {
                return (
                  <div className="mx-auto mt-8 md:mt-0">
                    <Image
                      src={require('/public/images/free.png')}
                      alt={'Own Data'}
                      width={505}
                      height={554}
                      quality={100}
                    />
                  </div>
                )
              }}
            />

            <Section
              type="wide"
              heading="Own Your Data 🤴"
              subHeading="All your form data is stored in your Google Sheets, no vendor lock-in."
              renderBody={() => (
                <div className="mx-auto mt-8 md:mt-0">
                  <Image
                    src={require('/public/images/own-data.png')}
                    alt={'Own Data'}
                    width={567}
                    height={321}
                    quality={100}
                  />
                </div>
              )}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full md:flex-row gap-y-4 gap-x-9">
            <Section
              link={'https://github.com/nfuad/HeroForm'}
              className="bg-gradient-to-bl text-white from-[#FFC902] to-[#FF5991] relative cursor-pointer"
              type="wide"
              heading="Open Source 🚀"
              subHeading="Everything is open source, so you can self-host anytime."
              headingClassName="group-hover:tracking-widest transition-all"
              subHeadingClassName="text-white opacity-75"
              renderBody={() => (
                <>
                  <div className="mx-auto mt-8 transition-all md:mt-0 group-hover:scale-95 transform-gpu">
                    <Image
                      src={require('/public/images/open-source.png')}
                      alt={'Open Source'}
                      width={822 / 2.5}
                      height={899 / 2.5}
                      quality={100}
                    />
                  </div>
                  <div className="absolute transition-all top-6 right-6 md:top-7 md:right-7 lg:top-10 lg:right-10 group-hover:-rotate-45 transform-gpu">
                    <Image
                      src={require('/public/images/github-icon.svg')}
                      alt=""
                      width={45}
                      height={45}
                    />
                  </div>
                </>
              )}
            />
            <Section
              className="bg-gradient-to-tr from-[#5900FE] to-[#F700DF]"
              headingClassName="text-white"
              subHeadingClassName="text-white opacity-75"
              type="narrow"
              heading="Privacy-centric Analytics 🕵️‍♀️"
              subHeading="See how the form is performing, and how it is being used."
              renderBody={() => {
                return (
                  <div className="mt-8 md:mt-0">
                    <Image
                      src={require('/public/images/analytics.png')}
                      className=""
                      width={335 / 1.5}
                      height={337 / 1.5}
                      alt={'LightHouse Performance Score'}
                    />
                  </div>
                )
              }}
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full md:flex-row gap-y-4 gap-x-9">
            <Section
              type="narrow"
              heading="Ultra Fast ⚡️"
              subHeading="Loads faster than any other alternative."
              renderBody={() => (
                <div className="relative flex items-center justify-center mt-8 lg:mt-0">
                  <Image
                    src={require('/public/images/score.svg')}
                    className=""
                    width={200}
                    height={200}
                    alt={'LightHouse Performance Score'}
                  />
                  <span className="absolute text-white transform -translate-x-1/2 -translate-y-1/2 text-7xl font-heading top-1/2 left-1/2">
                    99
                  </span>
                </div>
              )}
            />
            <Section
              type="wide"
              heading="100% Responsive 💯"
              subHeading="Your form feels great to use on any device, regardless of size."
              renderBody={() => (
                <div className="mt-8 lg:mt-0">
                  <Image
                    src={require('/public/images/responsive.png')}
                    alt={'Fully Responsive'}
                    width={2428}
                    height={1250}
                    quality={100}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
      <Testimonials />
      {/* <SelfHosting /> */}
      <LastCTA />
    </Layout>
  )
}

export default HomePage

const Section = ({
  link = '',
  type,
  heading = '',
  subHeading = '',
  renderBody = () => {},
  className = '',
  headingClassName = '',
  subHeadingClassName = '',
}) => {
  const clickable = link.length > 0
  return (
    <div
      onClick={clickable ? () => window.open(link, '_blank') : null}
      className={`p-9 ${
        type === 'narrow'
          ? 'sm:max-w-[400px] md:max-w-[300px] w-full'
          : 'sm:max-w-[400px] md:max-w-[700px] w-full  grow'
      } bg-white md:h-[600px] rounded-3xl shadow-[rgba(0,0,0,0.05)_0px_20px_40px_0px] flex flex-col justify-between group ${className}`}
    >
      <div>
        <h3
          className={`text-xl md:text-2xl mb-2 tracking-wide ${headingClassName}`}
        >
          {heading}
        </h3>
        <h4
          className={`text-gray-500 opacity-75 tracking-wide text-base md:text-lg ${subHeadingClassName}`}
        >
          {subHeading}
        </h4>
      </div>
      {renderBody()}
      {/* this div is required to maintain the justify-between :) */}
      <div />
    </div>
  )
}
