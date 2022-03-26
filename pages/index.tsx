import Button from '@components/button'
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import Layout from '@components/layout'
import Link from 'next/link'
import { ROUTES } from '@constants/routes'
import {
  HeartIcon,
  ChevronRightIcon,
  CodeIcon,
  LightningBoltIcon,
  EyeOffIcon,
  CheckIcon,
} from '@components/icons'
import { GetStartedButton } from '@components/common'

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

const HappyEmojiIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 xl:w-6 xl:h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

const QuickFactItem = ({ renderIcon, children }) => {
  return (
    <li className="flex items-center justify-center w-1/3 sm:w-auto gap-x-1">
      <span className="text-orange-600">{renderIcon()}</span>
      <span>{children}</span>
    </li>
  )
}
const QuickFacts = () => {
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

const SeeDemoButton = () => {
  return (
    <button className="flex items-center justify-center mx-auto my-10 text-lg tracking-wide text-center text-indigo-600 hover:text-indigo-900 xl:text-xl font-heading group">
      <span className="transition-all duration-75 group-hover:mr-2">
        See It In Action
      </span>
      <ChevronRightIcon />
    </button>
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
            top: -80px;
            left: 0px;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -80px;
            left: 0px;
            opacity: 1;
            transform: scale(0.9);
          }
          50% {
            left: -50px;
            transform: scale(1);
            opacity: 0;
          }
          100% {
            opacity: 0;
            top: -150px;
            left: -20px;
            transform: scale(0);
          }
        }
        @keyframes emoji-two-anim {
          0% {
            top: -100px;
            left: 70px;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -100px;
            left: 70px;
            opacity: 1;
            transform: scale(1.5);
          }
          50% {
            transform: scale(1.7);
            left: 70px;
          }
          100% {
            opacity: 0;
            top: -200px;
            left: 70px;
            transform: scale(2.6);
          }
        }
        @keyframes emoji-three-anim {
          0% {
            top: -80px;
            right: 0px;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            top: -80px;
            right: 0px;
            opacity: 1;
            transform: scale(0.9);
          }
          50% {
            right: -50px;
            transform: scale(1);
            opacity: 0;
          }
          100% {
            opacity: 0;
            top: -150px;
            right: -20px;
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

// max-w-xs mx-auto my-24 text-xs leading-snug tracking-wide text-center text-gray-500 sm:mt-8 sm:text-sm md:max-w-xl md:text-lg xl:max-w-3xl xl:text-2xl xl:leading-normal
const SubHeading = () => (
  <p className="max-w-3xl text-[#545465] text-[26px] leading-tight mt-16 mb-8 text-center mx-auto">
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
const Heading = () => {
  const onHover = () => {
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      emojis: ['🎉', '🤯', '🔥'],
      emojiSize: 150,
    })
  }

  const onClick = () =>
    alert('Yes! It is. Now keep this a secret and don’t tell anyone 🙏')

  return (
    <h1 className="mt-32 text-xl leading-10 text-center sm:text-3xl md:text-4xl xl:text-8xl xl:leading-[1.1]">
      <span className="text-black">
        <span>Create</span>{' '}
        <span className="relative">
          <span
            className="text-indigo-500 cursor-help"
            onMouseOver={onHover}
            onClick={onClick}
          >
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
const Video = () => {
  return (
    <div className="w-3/4 mx-auto my-20 overflow-hidden bg-transparent rounded-6xl">
      <Image quality={100} src={require('/public/demo.png')} />
    </div>
  )
}

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <h2 className="text-3xl">Here's How It Works</h2>

      <div className="flex flex-col items-center justify-center mt-10 mb-14">
        <div className="flex flex-col items-center justify-center">
          <span className="w-1 h-24 rounded-full bg-gradient-to-t from-indigo-500 via-purple-200 to-transparent" />
          <span className="flex items-center justify-center w-10 h-10 -mt-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
            1
          </span>
        </div>
        <h3 className="mt-5 mb-10 text-5xl text-indigo-900 font-heading">
          Connect Google Sheets
        </h3>

        <div className="flex items-center justify-between space-x-10">
          <Image src={require('/public/connect.png')} />
          <div className="flex flex-col max-w-sm space-y-10">
            <div className="space-y-2">
              <h4 className="text-2xl">Integrate Google Sheets</h4>
              <p className="text-sm text-gray-600">
                Operate with tools you and your team are familiar with. No need
                to use any other software.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl">Own Your Data</h4>
              <p className="text-sm text-gray-600">
                We don&apos;t store any responses on our database. Everything
                gets stored on your Google Sheets. You own your data.
              </p>
            </div>
          </div>
        </div>
        {/* <p className="max-w-md text-center">
          All you need to do is connect your Google Sheets &amp; we’ll create a
          sheet in there to store your questions, metadata and the responses! We
          store the least amount of data &amp; protect your privacy :) Have
          everyone in the team involved by giving them access to the sheet.
        </p> */}
      </div>
      <div className="flex flex-col items-center justify-center mt-10 mb-14">
        <div className="flex flex-col items-center justify-center">
          <span className="w-1 h-24 rounded-full bg-gradient-to-t from-indigo-500 via-purple-200 to-transparent" />
          <span className="flex items-center justify-center w-10 h-10 -mt-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
            2
          </span>
        </div>
        <h3 className="mt-5 mb-10 text-5xl text-indigo-900 font-heading">
          Create Amazing Forms
        </h3>
        <Image src={require('/public/create.png')} />
        {/* <p className="max-w-md text-center">
          Create as many forms as you want with our simple and intuitive admin
          UI. You don't need to have to code/design anything. You can even
          manage forms from Google Sheets. Inject analytics code to keep track
          of your form's performance (coming soon)
        </p> */}
      </div>
      <div className="flex flex-col items-center justify-center mt-10 mb-14">
        <div className="flex flex-col items-center justify-center">
          <span className="w-1 h-24 rounded-full bg-gradient-to-t from-indigo-500 via-purple-200 to-transparent" />
          <span className="flex items-center justify-center w-10 h-10 -mt-2 text-white rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
            3
          </span>
        </div>
        <h3 className="mt-5 mb-10 text-5xl text-indigo-900 font-heading">
          Share Everywhere
        </h3>
        <Image src={require('/public/share.png')} />
        {/* <p className="max-w-md text-center">
          Share your forms with anyone you want. You can embed the link on your
          website, share on socials, or even send them to your customers via
          private DMs and emails :) See the responses get populated in your
          Google Sheets.
        </p> */}
      </div>
    </div>
  )
}

const LastCTA = () => {
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

const SelfHosting = () => {
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

const Testimonials = () => {
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
