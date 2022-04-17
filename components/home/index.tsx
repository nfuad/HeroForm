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
import { PlayIcon } from '@components/icons/play'
import { showConfettiAnimation } from '@lib/show-confetti-animation'

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
      <QuickFactItem renderIcon={HeartIcon}>Free Forever</QuickFactItem>
      <QuickFactItem renderIcon={LightningBoltIcon}>
        Ultra Fast (100ms)
      </QuickFactItem>
      <QuickFactItem renderIcon={CodeIcon}>Open Source</QuickFactItem>
      <QuickFactItem renderIcon={EyeOffIcon}>Privacy Focused</QuickFactItem>
    </ul>
  )
}

export const SeeDemoButton = () => {
  const demoURL = 'https://inquie.sh/vH8ds0b3'

  return (
    <a
      target={'_blank'}
      rel={'noopener noreferrer'}
      href={demoURL}
      className="flex items-center justify-center mx-auto my-10 text-lg tracking-wide text-center text-indigo-600 hover:text-indigo-900 xl:text-xl font-heading group"
    >
      <span className="transition-all duration-75 group-hover:mr-2">
        See It In Action
      </span>
      <ChevronRightIcon />
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

export const SubHeading = () => (
  <p className="max-w-full md:max-w-2xl lg:max-w-3xl text-[#545465] text-xs px-10 sm:px-2 sm:text-sm md:text-xl xl:text-xl font-heading tracking-wider xl:leading-tight mt-8 lg:mt-12 mb-8 text-center mx-auto">
    Asking questions with good looking forms should’ve never been{' '}
    <em>pricey</em>, <em>bloated</em> or <em>heavily branded</em>. With Inquire,
    it finally isn't.
    <style jsx>{`
      em {
        background: #ffd9d9;
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        border-radius: 0.2em;
        color: #3b06a5;
        font-weight: bold;
      }
    `}</style>
  </p>
)
export const Heading = () => {
  const onHover = () => showConfettiAnimation({ emojis: ['🎉', '🤯', '🔥'] })

  return (
    <h1 className="mt-32 leading-9 text-center text-[26px] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xl:leading-[1.1]">
      <span className="text-black">
        <span>Create</span>{' '}
        <span className="relative">
          <span className="text-indigo-500 cursor-help" onMouseOver={onHover}>
            Free
          </span>{' '}
          <FreeAnimations />
        </span>
        <span>Forms &amp; Surveys.</span>
      </span>
      <br />
      <span>On Brand, Without Coding.</span>
    </h1>
  )
}

export const Video = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="w-3/4 mx-auto my-20 overflow-hidden bg-transparent rounded-6xl">
      <div className="py-8">
        <div className="grid items-start justify-center gap-8 ">
          <div className="relative group">
            <div className="absolute transition duration-1000 opacity-75 rounded-2xl -inset-1 bg-gradient-to-r from-pink-300 via-red-200 to-purple-300 blur group-hover:opacity-100 group-hover:duration-200 animate-tilt" />
            <div
              className="w-full mx-auto cursor-pointer rounded-xl max-w-7xl"
              onClick={() => {
                setShowVideo(true)
              }}
              onMouseEnter={() => {
                setIsHovering(true)
              }}
              onMouseLeave={() => {
                setIsHovering(false)
              }}
            >
              <Image
                className="rounded-xl"
                quality={100}
                src={require('/public/images/demo.png')}
              />
              <div
                className={`absolute ${
                  isHovering
                    ? 'text-indigo-900 shadow-lg rotate-45 scale-110'
                    : 'text-indigo-600 shadow-md '
                } -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2 transition-all duration-75`}
              >
                <PlayIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showVideo && <YTVideoEmbed setShowVideo={setShowVideo} />}
    </div>
  )
}

export const HowItWorks = () => {
  const data = [
    {
      title: 'Connect Google Sheets',
      points: [
        {
          heading: 'Integrate Google Sheets',
          body: 'Operate with tools you and your team are familiar with. No need to use any other software.',
        },
        {
          heading: 'Own Your Data',
          body: "Your data gets stored on your Google Sheets. We don't store any responses on our database.",
        },
        {
          heading: 'Process Responses',
          body: 'Give your teammates access to the spreadsheet or export responses in CSV/JSON formats right from Google Sheets.',
        },
      ],
      image: {
        src: require('/public/images/connect.png'),
        alt: 'Connect Google Sheets',
        height: 750,
        objectFit: 'contain',
        objectPosition: 'center',
      },
    },
    {
      title: 'Create Amazing Forms',
      points: [
        {
          heading: 'Unlimited Forms',
          body: "Create as many forms as you want. And as many questions as you want. We don't limit you.",
        },
        {
          heading: 'Simple & Minimal UI',
          body: "Unlike all the other tools, we don't have a bloated UI. Inquire is simple and Minimal - so it's to get things done.",
        },
        {
          heading: 'Super Fast & Accessible',
          body: 'Forms load faster than you can blink. How cool is that? :) And accessibility features coming soon.',
        },
      ],
      image: {
        src: require('/public/images/create.png'),
        alt: 'Create Amazing Forms',
      },
    },
    {
      title: 'Share Everywhere',
      points: null,
      image: {
        src: require('/public/images/share.png'),
        alt: 'Share Everywhere',
      },
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <h2 className="text-3xl">Here's How It Works</h2>

      {data.map((item, index) => {
        const position = index + 1
        return <HowItWorksSection {...item} position={position} key={index} />
      })}
    </div>
  )
}

const HowItWorksSection = ({ position, title, points, image }) => {
  const isEven = position % 2 === 0
  const withPoints = points?.length > 0 // one doesn't have points :)

  const renderPoints = () =>
    points?.map(({ heading, body }, index) => {
      return (
        <div className="space-y-2" key={index}>
          <h4 className="text-2xl">{heading}</h4>
          <p className="text-sm text-gray-600">{body}</p>
        </div>
      )
    })

  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="flex flex-col items-center justify-center">
        <span className="w-1 h-24 rounded-full bg-gradient-to-t from-indigo-500 via-purple-200 to-transparent" />
        <span className="flex items-center justify-center w-10 h-10 -mt-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
          {position}
        </span>
      </div>
      <h3 className="mt-5 mb-10 text-5xl text-indigo-900 font-heading">
        {title}
      </h3>

      <div
        className={`flex ${
          isEven ? 'flex-row-reverse' : ''
        } items-center justify-between my-20 ${withPoints ? 'space-x-16' : ''}`}
      >
        <div className={isEven ? 'ml-24' : ''}>
          <Image {...image} />
        </div>
        <div className="flex flex-col max-w-sm space-y-10">
          {renderPoints()}
        </div>
      </div>
    </div>
  )
}

export const LastCTA = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl py-20 mx-auto my-32 shadow-sm rounded-xl bg-yellow-50 gap-y-6">
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl">
        Ready to Create Amazing Forms?
      </h2>
      <p>
        It's free. It's fast. It's privacy-focused &amp; it's Open Source. Get
        started now 👇
      </p>
      <GetStartedButton />
    </div>
  )
}

export const SelfHosting = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto my-40 text-center gap-y-10">
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl">
        <span>Don't Like This?</span>
        <br />
        <span className="text-gray-400">
          Embrace the unlimited customization
        </span>
      </h2>

      <div className="flex items-center justify-between w-full max-w-md mx-auto">
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
      <p className="max-w-md tracking-wide text-gray-500 font-heading text-md">
        There's zero vendor lock-in going on. And everything is well documented.
        You're free to modify the source code or self host anytime you want
      </p>
    </div>
  )
}

export const Testimonials = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto my-40 text-center gap-y-10">
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl">
        <span>What People Think</span>
        <br />
        <span className="text-gray-400">Good stuff...</span>
      </h2>

      <figure>
        <blockquote>
          <p className="max-w-xl my-4 text-xl tracking-wide text-gray-900 font-heading">
            &quot; Words can be like X-rays, if you use them properly—they’ll go
            through anything. You read and you’re pierced. &quot;{' '}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center gap-x-2">
          <Image
            src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            width={30}
            height={30}
            objectFit="cover"
            className="rounded-full"
          />{' '}
          <cite>Aldous Huxley, Brave New World</cite>
        </figcaption>
      </figure>
      <figure>
        <blockquote>
          <p className="max-w-xl my-4 text-xl tracking-wide text-gray-900 font-heading">
            &quot; Words can be like X-rays, if you use them properly—they’ll go
            through anything. You read and you’re pierced. &quot;{' '}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center gap-x-2">
          <Image
            src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            width={30}
            height={30}
            objectFit="cover"
            className="rounded-full"
          />{' '}
          <cite>Aldous Huxley, Brave New World</cite>
        </figcaption>
      </figure>
      <figure>
        <blockquote>
          <p className="max-w-xl my-4 text-xl tracking-wide text-gray-900 font-heading">
            &quot; Words can be like X-rays, if you use them properly—they’ll go
            through anything. You read and you’re pierced. &quot;{' '}
          </p>
        </blockquote>
        <figcaption className="flex items-center justify-center gap-x-2">
          <Image
            src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg"
            width={30}
            height={30}
            objectFit="cover"
            className="rounded-full"
          />{' '}
          <cite>Aldous Huxley, Brave New World</cite>
        </figcaption>
      </figure>
    </div>
  )
}

const YTVideoEmbed = ({ setShowVideo }) => {
  return (
    <div
      onClick={() => {
        setShowVideo(false)
        console.log('clicked1')
      }}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className={
        'fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'
      }
    >
      <iframe
        width={'50%'}
        height={'50%'}
        src="https://www.youtube.com/embed/OJyuk1JHyi8?controls=0"
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-xl"
      />
    </div>
  )
}
