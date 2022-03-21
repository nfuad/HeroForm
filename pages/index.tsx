import Button from '@components/button'
// import Header from '@components/header'
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import { useEffect } from 'react'

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="mt-24">
        <Heading />
        <SubHeading />
        <QuickFacts />
        <SeeDemoButton />
        <Video />
        <HowItWorks />
        <Testimonials />
        <SelfHosting />
        <LastCTA />
        <Footer />
      </main>
    </>
  )
}

/**
 *
 */

export default HomePage

const JoinDiscordButton = () => {
  return (
    <svg
      width="35"
      height="38.732"
      viewBox="0 0 71 55"
      fill="none"
      className="hidden mr-5 sm:block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
          fill="#23272A"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="71" height="55" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
const Header = () => (
  <header className="flex items-center justify-between px-5 py-5">
    <p className="text-xl sm:text-2xl font-heading">Inquire</p>
    <div className="flex items-center justify-center">
      <JoinDiscordButton />
      <GitHubStars />
      <GetStartedButton />
    </div>
  </header>
)
const GetStartedButton = () => {
  return (
    <button className="bg-[#2c2c2c] bg-gradient-to-r hover:from-gray-900 hover:to-indigo-800 transition-all duration-1000 text-white rounded-lg px-5 py-3 transform-gpu hover:scale-105 font-heading tracking-wider text-xs xl:text-sm">
      Get Started - It's Free
      <style jsx>{`
        button {
          box-shadow: 0px 13.6301px 35.58px -6.81507px #cfcfcf;
        }
      `}</style>
    </button>
  )
}
const GitHubStars = () => {
  /**
   * @description
   * GitHub stars badge.
   *
   * @see: https://ghbtns.com/
   */

  return (
    <iframe
      src="https://ghbtns.com/github-btn.html?user=nfuad&repo=inquire&type=star&count=false&size=large"
      frameBorder="0"
      scrolling="0"
      width="100"
      height="30"
      title="GitHub"
      className="hidden sm:block"
    />
  )
}

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

const EyeOffIcon = () => {
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
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  )
}
const HeartIcon = () => {
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
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

const LightningBoltIcon = () => {
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
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  )
}

const CodeIcon = () => {
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
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  )
}

const ChevronRightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 mt-1 xl:w-5 xl:h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={4}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
        🔥
      </span>
      <span className="emoji" id="two">
        🎉
      </span>
      <span className="emoji" id="three">
        😍
      </span>
      <style jsx>{`
        @keyframes emoji-one-anim {
          from {
            top: -20px;
            left: 0px;
            opacity: 0;
            transform: scale(0.2);
          }
          50% {
            opacity: 50%;
            left: -20%;
            transform: scale(0.4);
          }
          to {
            left: 10%;
            top: -60px;
            opacity: 0;
            transform: scale(0.5);
          }
        }
        @keyframes emoji-two-anim {
          from {
            top: -30px;
            left: 50%;
            opacity: 0;
            transform: scale(0.1);
          }
          30% {
            opacity: 50%;
            left: 10%;
            transform: scale(0.5);
          }
          60% {
            opacity: 30%;
            left: 20%;
          }
          to {
            left: -10%;
            top: -50px;
            opacity: 0;
            transform: scale(0.1);
          }
        }
        @keyframes emoji-three-anim {
          0% {
            top: -25px;
            right: 0px;
            opacity: 0.1;
            transform: scale(0);
          }
          10% {
            transform: scale(0.7);
          }
          30% {
            opacity: 50%;
            right: -20%;
            transform: scale(0.9);
          }
          70% {
            opacity: 30%;
            right: 0%;
            transform: scale(0.7);
          }
          100% {
            right: -10%;
            top: -70px;
            opacity: 0;
            transform: scale(0.2);
          }
        }

        .emoji {
          position: absolute;
        }

        #one {
          animation: emoji-one-anim 1.5s infinite forwards ease-in-out;
        }
        #two {
          animation: emoji-two-anim 1.5s infinite forwards ease-in-out;
        }
        #three {
          animation: emoji-three-anim 1.5s infinite forwards ease-in-out;
        }
      `}</style>
    </>
  )
}

const SubHeading = () => (
  <h2 className="max-w-xs mx-auto mt-5 text-xs leading-snug tracking-wide text-center text-gray-900 sm:mt-8 sm:text-sm md:max-w-xl md:text-lg xl:max-w-3xl xl:text-2xl font-heading mb-9">
    Asking questions with good looking forms should’ve never been{' '}
    <em>pricey</em>, <em>bloated</em> or <em>heavily branded</em>. Not Anymore.
  </h2>
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
    <h1 className="text-xl text-center sm:text-3xl md:text-4xl xl:text-6xl">
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
        <span>Forms &amp; Surveys In Minutes.</span>
      </span>
      <br />
      <span className="text-gray-400">
        With Stunning Designs &amp; Zero Coding.
      </span>
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
        <p className="max-w-md text-center">
          All you need to do is connect your Google Sheets &amp; we’ll create a
          sheet in there to store your questions, metadata and the responses! We
          store the least amount of data &amp; protect your privacy :) Have
          everyone in the team involved by giving them access to the sheet.
        </p>
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
        <p className="max-w-md text-center">
          Create as many forms as you want with our simple and intuitive admin
          UI. You don't need to have to code/design anything. You can even
          manage forms from Google Sheets. Inject analytics code to keep track
          of your form's performance (coming soon)
        </p>
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
        <p className="max-w-md text-center">
          Share your forms with anyone you want. You can embed the link on your
          website, share on socials, or even send them to your customers via
          private DMs and emails :) See the responses get populated in your
          Google Sheets.
        </p>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-center my-14">
      <p className="pb-6 leading-tight font-heading">
        <span>Created with</span>
        &nbsp;<span className="animate animate-pulse">❤️</span>
        &nbsp;&nbsp;
        <span>
          {' '}
          by <a href="/folks">folks.</a>
        </span>
        <br />
        <span>You dare not sue or copy us 👀</span>
      </p>
      <p className="text-sm text-gray-500">
        Copyright Ⓒ {new Date().getFullYear()} Inquire. All rights reserved.
      </p>
    </footer>
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
