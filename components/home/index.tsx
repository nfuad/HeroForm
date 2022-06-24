import Image from 'next/image'
import {
  HeartIcon,
  ChevronRightIcon,
  CodeIcon,
  LightningBoltIcon,
  EyeOffIcon,
  CheckIcon,
} from '@components/icons'
import { GetStartedButton } from '@components/common'
import { useState } from 'react'
import { CloseIcon } from '@components/icons'
import { showConfettiAnimation } from '@lib/show-confetti-animation'
import { SITE_DATA } from '@constants/site-data'

const QuickFactItem = ({ renderIcon, children }) => {
  return (
    <li className="flex items-center justify-center w-1/3 sm:w-auto gap-x-1">
      <span className="text-orange-600">{renderIcon()}</span>
      <span>{children}</span>
    </li>
  )
}
export const QuickFacts = () => {
  return (
    <ul className="flex flex-wrap items-center justify-center mx-auto text-xs tracking-wide xl:text-sm font-heading gap-x-6">
      <QuickFactItem renderIcon={HeartIcon}>Free Tier</QuickFactItem>
      <QuickFactItem renderIcon={LightningBoltIcon}>
        Ultra Fast (100ms)
      </QuickFactItem>
      <QuickFactItem renderIcon={CodeIcon}>Open Source</QuickFactItem>
      <QuickFactItem renderIcon={EyeOffIcon}>Privacy Focused</QuickFactItem>
    </ul>
  )
}

export const SeeDemoButton = ({
  children = 'Text Here',
  className = '',
}: any) => {
  const demoURL = 'https://heroform.io/A6e-FRQ-'

  return (
    <a
      target={'_blank'}
      rel={'noopener noreferrer'}
      href={demoURL}
      className="flex items-center font-bold justify-center mx-auto text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl text-center text-blue-500 hover:text-indigo-900 font-heading group mt-0"
    >
      <span className="transition-all duration-75 group-hover:mr-2 lg:group-hover:mr-4">
        {children}
      </span>
      <ChevronRightIcon
        strokeWidth={4}
        // className={`w-10 h-10 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-24 lg:h-24 ${className}`}
        className={`${className}`}
      />
    </a>
  )
}

const FreeAnimations = () => {
  return (
    <>
      <span className="emoji" id="one">
        🎉
      </span>
      <span className="emoji" id="two">
        🎉
      </span>
      <span className="emoji" id="three">
        🎉
      </span>
      <style jsx>{`
        @keyframes emoji-one-anim {
          0% {
            top: -20%;
            left: 0%;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -70%;
            left: 0%;
            opacity: 1;
            transform: scale(0.9);
          }
          50% {
            left: -15%;
            transform: scale(1);
            opacity: 0;
          }
          100% {
            opacity: 0;
            top: -190%;
            left: -20%;
            transform: scale(0);
          }
        }
        @keyframes emoji-two-anim {
          0% {
            top: -20%;
            left: 50%;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -70%;
            left: 50%;
            opacity: 1;
            transform: scale(1.5);
          }
          50% {
            transform: scale(1.7);
            left: 50%;
          }
          100% {
            opacity: 0;
            top: -200%;
            left: 50%;
            transform: scale(2.6);
          }
        }
        @keyframes emoji-three-anim {
          0% {
            top: -20%;
            right: -30%;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -70%;
            right: -30%;
            opacity: 1;
            transform: scale(0.9);
          }
          50% {
            right: -80%;
            transform: scale(1);
            opacity: 0;
          }
          100% {
            opacity: 0;
            top: -190%;
            right: -20%;
            transform: scale(0);
          }
        }

        .emoji {
          position: absolute;
        }

        #one {
          animation: emoji-one-anim 1.5s infinite forwards linear;
        }
        #two {
          animation: emoji-two-anim 1.5s infinite forwards linear;
        }
        #three {
          animation: emoji-three-anim 1.5s infinite forwards linear;
        }
      `}</style>
    </>
  )
}

export const Heading = () => {
  const onHover = () => showConfettiAnimation({ emojis: ['🎉', '🤯', '🔥'] })

  return (
    <h1 className="reveal-on-scroll mt-24 md:mt-32 lg:mt-40 leading-9 text-center text-[28px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[1.2]">
      <span className="text-black">
        <span>Create</span>{' '}
        <span className="relative">
          <span className="text-pink-500 cursor-help" onMouseOver={onHover}>
            Free
          </span>{' '}
          {/* <FreeAnimations /> */}
        </span>
        <span>Forms &amp; Surveys.</span>
      </span>
      <br />
      <span>On Brand. Zero Coding.</span>
    </h1>
  )
}

export const Video = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="w-full px-4 py-16 mx-auto my-4 overflow-hidden bg-transparent lg:my-20 sm:w-3/4 rounded-6xl">
      <div
        onClick={() => {
          setShowVideo(true)
          setIsHovering(false)
        }}
        onMouseEnter={() => {
          setIsHovering(true)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
        }}
        className="items-start justify-center gap-8 max-w-[1500px] mx-auto shadow-3xl  relative group cursor-pointer flex rounded-xl"
      >
        <Image
          alt={`${SITE_DATA.name} Video`}
          className="h-full p-0 m-0 rounded-xl aspect-video"
          quality={100}
          src={require('/public/images/og-image.webp')}
          width={1920}
          height={1080}
        />
        <div
          className={`hidden lg:block absolute ${
            isHovering ? 'text-indigo-900 scale-95' : 'text-indigo-600 '
          } -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 transition-all duration-75 flex justify-center items-center`}
        >
          <Image
            src={require('/public/images/play.svg')}
            width={100}
            height={100}
            alt={'Play Icon'}
          />
        </div>
        <div
          className={`hidden sm:block lg:hidden absolute ${
            isHovering ? 'text-indigo-900 scale-95' : 'text-indigo-600 '
          } -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 transition-all duration-75 flex justify-center items-center`}
        >
          <Image
            src={require('/public/images/play.svg')}
            width={64}
            height={64}
            alt={'Play Icon'}
          />
        </div>
        <div
          className={`block sm:hidden absolute ${
            isHovering ? 'text-indigo-900 scale-95' : 'text-indigo-600 '
          } -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 transition-all duration-75 flex justify-center items-center`}
        >
          <Image
            src={require('/public/images/play.svg')}
            width={48}
            height={48}
            alt={'Play Icon'}
          />
        </div>
      </div>

      {showVideo && <YTVideoEmbed setShowVideo={setShowVideo} />}
    </div>
  )
}

export const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 reveal-on-scroll sm:px-8 md:px-12 lg:px-16 md:py-32 lg:py-40">
      <div className="w-full max-w-5xl mx-auto mb-6 md:mb-0">
        <h2 className="w-full mb-4 text-3xl leading-tight tracking-wide text-center sm:text-4xl md:text-5xl md:mb-20 lg:text-7xl text-gradient-blue-two">
          Here&apos;s How It Works 👇
        </h2>
      </div>
      <div className="flex flex-col max-w-5xl py-4 gap-y-12 md:py-8 md:gap-y-24 lg:py-20 lg:gap-y-40">
        <div className="flex flex-col items-center justify-between md:flex-row gap-y-6 gap-x-10">
          <div className="w-full md:max-w-lg">
            <h3 className="text-xl leading-tight text-center sm:text-2xl md:text-4xl md:text-left lg:text-6xl">
              Connect Sheets to collect responses from everyone.
            </h3>
          </div>
          <div className="w-full max-w-[450px] md:max-w-full">
            <Image
              src={require('/public/images/connect-sheets.png')}
              alt={'Connect Sheets'}
              width={800}
              height={500}
              quality={100}
            />
          </div>
        </div>
        <div className="flex flex-col-reverse items-center justify-between md:flex-row gap-y-6 gap-x-10">
          <div className="w-full max-w-[450px] md:max-w-full">
            <Image
              src={require('/public/images/create-great-forms.png')}
              alt={'Connect Sheets'}
              width={800}
              height={500}
              quality={100}
            />
          </div>
          <div className="w-full md:max-w-lg">
            <h3 className="text-xl leading-tight text-center sm:text-2xl md:text-4xl md:text-right lg:text-6xl">
              Create forms ultra fast with a very minimal editor UI.
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between md:flex-row gap-y-6 gap-x-10">
          <div className="w-full md:max-w-lg">
            <h3 className="text-xl leading-tight text-center sm:text-2xl md:text-4xl md:text-left lg:text-6xl">
              Get a short link to share all over the internet.
            </h3>
          </div>
          <div className="w-full max-w-[450px] md:max-w-full">
            <Image
              src={require('/public/images/share-everywhere.png')}
              alt={'Connect Sheets'}
              width={800}
              height={500}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SelfHosting = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto my-40 text-center px-7 gap-y-10">
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl">
        <span>{"Don't Like This?"}</span>
        <br />
        <span className="text-gray-400">
          Embrace the unlimited customization
        </span>
      </h2>

      <div className="items-center justify-between hidden w-full max-w-md mx-auto sm:flex">
        <div className="flex flex-col items-start justify-start">
          <p className="flex items-center justify-center">
            <CheckIcon />
            <span className="ml-2 font-heading">Open Source Codebase</span>
          </p>
          <p className="flex items-center justify-center">
            <CheckIcon />
            <span className="ml-2 font-heading">Community Driven</span>
          </p>
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="flex items-center justify-center">
            <CheckIcon />
            <span className="ml-2 font-heading">MIT Licensed</span>
          </p>
          <p className="flex items-center justify-center">
            <CheckIcon />
            <span className="ml-2 font-heading">Deployment Docs</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:hidden">
        <p className="flex items-center justify-center">
          <CheckIcon />
          <span className="ml-2 font-heading">Open Source Codebase</span>
        </p>
        <p className="flex items-center justify-center">
          <CheckIcon />
          <span className="ml-2 font-heading">Community Driven</span>
        </p>
        <p className="flex items-center justify-center">
          <CheckIcon />
          <span className="ml-2 font-heading">MIT Licensed</span>
        </p>
        <p className="flex items-center justify-center">
          <CheckIcon />
          <span className="ml-2 font-heading">Deployment Docs</span>
        </p>
      </div>
      <p className="max-w-md tracking-wide text-gray-500 font-body text-md">
        {
          "There's zero vendor lock-in going on. And everything is well documented. You're free to modify the source code or self host anytime you want"
        }
      </p>
    </div>
  )
}

const Quote = ({ block, image, citation }) => (
  <figure className="max-w-[400px] md:max-w-full p-5 lg:p-7 shadow-[rgba(0,0,0,0.05)_0px_20px_40px_0px] rounded-xl mx-auto sm:mx-0 w-full md:w-1/3 grow">
    <blockquote>
      <p className="my-4 text-base leading-normal tracking-wider text-gray-900 font-heading">
        {block}
      </p>
    </blockquote>
    <figcaption className="flex items-center justify-center gap-x-2">
      <Image
        src={image}
        width={30}
        height={30}
        objectFit="cover"
        className="rounded-full"
        alt="Author"
      />{' '}
      <cite className="text-xs sm:text-sm">{citation}</cite>
    </figcaption>
  </figure>
)

export const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center px-5 mx-auto text-center md:px-12 lg:px-0 my-14 md:my-28 lg:my-40 md:gap-y-10">
      <h2 className="text-center text-2xl md:text-5xl lg:text-7xl text-black leading-[1.4] mb-6 lg:mb-10">
        Here&apos;s what folks are saying
      </h2>

      <div className="flex flex-row flex-wrap items-start justify-between w-full max-w-5xl sm:justify-center md:justify-between gap-y-4 gap-x-10 md:gap-y-12">
        <Quote
          block={
            'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.'
          }
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
        <Quote
          block={
            'Words can be like X-rays, if you use them properly—they’ll go through an be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.'
          }
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
        <Quote
          block={'Words can be like X-rays, if≈ßu’re pierced.'}
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
        <Quote
          block={
            'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.'
          }
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
        <Quote
          block={
            'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.'
          }
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
        <Quote
          block={
            'Words can be like X-rays, if you use them properly—they’ll go through anything. You read and you’re pierced.'
          }
          image="/images/avatar.png"
          citation={'Monika Mayer - CEO, Whatever'}
        />
      </div>
    </div>
  )
}

const YTVideoEmbed = ({ setShowVideo }) => {
  const handleClick = () => {
    setShowVideo(false)
  }

  return (
    <div
      onClick={handleClick}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={
        'fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'
      }
    >
      <button
        className="absolute text-white transition-all duration-75 top-10 right-10 hover:scale-110"
        onClick={handleClick}
      >
        <CloseIcon />
      </button>
      <div className="flex items-center justify-center w-screen h-screen max-w-7xl">
        <iframe
          src="https://www.youtube.com/embed/OJyuk1JHyi8?controls=0"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full rounded-xl aspect-video"
        />
      </div>
    </div>
  )
}

export const LastCTA = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl md:mx-12 lg:mx-auto py-14 md:py-20 my-32 shadow-sm px-4 md:px-7 md:rounded-xl bg-gradient-to-r from-[#eecda3] to-[#ffacd0] gap-y-6">
      <h2 className="text-3xl text-center text-black md:text-4xl lg:text-5xl">
        Ready to Create Amazing Forms?
      </h2>
      <p className="max-w-lg py-2 text-base tracking-wide text-center text-red-900 md:text-2xl font-heading">
        {
          "It's free. It's fast. It's privacy-focused & it's Open Source. Get started now 👇"
        }
      </p>
      <GetStartedButton />
    </div>
  )
}

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
          ? 'max-w-[400px] sm:max-w-[400px] md:max-w-[300px] w-full'
          : 'max-w-[400px] sm:max-w-[400px] md:max-w-[700px] w-full  grow'
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

export const Features = () => (
  <div className="bg-[#FAFAFA] shadow-sm py-14 px-5 md:py-32 lg:py-40 flex flex-col justify-center items-center lg:my-20">
    <div className="max-w-4xl mx-auto mb-8 md:mb-16 lg:mb-24">
      {/* <h2 className="leading-9 text-center text-[26px] sm:text-4xl md:text-5xl xl:leading-[1.4]"> */}
      <h2 className="text-center text-3xl md:text-5xl max-w-sm md:max-w-xl lg:max-w-full lg:text-7xl text-black leading-[1.6] sm:leading-[1.6] md:leading-[1.6] lg:leading-[1.5]">
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
              <>
                <div className="hidden mx-auto mt-8 md:block md:mt-0">
                  <Image
                    src={require('/public/images/free.png')}
                    alt={'Own Data'}
                    width={505}
                    height={554}
                    quality={100}
                  />
                </div>
                <div className="block mx-auto mt-8 md:hidden md:mt-0">
                  <Image
                    src={require('/public/images/free.png')}
                    alt={'Own Data'}
                    width={250}
                    height={274}
                    quality={100}
                  />
                </div>
              </>
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
              <div className="absolute hidden transition-all lg:block top-6 right-6 md:top-7 md:right-7 lg:top-10 lg:right-10 group-hover:-rotate-45 transform-gpu">
                <Image
                  src={require('/public/images/github-icon.svg')}
                  alt=""
                  width={45}
                  height={45}
                />
              </div>
              <div className="absolute block transition-all lg:hidden top-7 right-7 md:top-8 md:right-6 lg:top-10 lg:right-10 group-hover:-rotate-45 transform-gpu">
                <Image
                  src={require('/public/images/github-icon.svg')}
                  alt=""
                  width={32}
                  height={32}
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
              <div className="mx-auto mt-8 md:mt-0">
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
)

export const Integrations = () => (
  <div className="flex flex-col items-center justify-center w-full gap-4 px-5 sm:gap-10 sm:flex-row lg:flex-col py-14 md:py-32 lg:py-40 lg:my-20">
    <h2 className="text-3xl text-center text-black md:text-left sm:text-4xl md:text-5xl md:max-w-full lg:text-7xl">
      Integrations? <br /> You Name It. <br />
      <span className="text-gray-400">Coming Soon.</span>
    </h2>
    <div className="hidden md:block">
      <Image
        src={require('/public/images/integrations.png')}
        alt={'Integrations'}
        width={550}
        height={500}
        quality={100}
      />
    </div>
    <div className="block md:hidden">
      <Image
        src={require('/public/images/integrations.png')}
        alt={'Integrations'}
        width={330}
        height={300}
        quality={100}
      />
    </div>
  </div>
)
