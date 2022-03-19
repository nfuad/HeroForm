import Button from '@components/button'
import JSConfetti from 'js-confetti'
import { useEffect } from 'react'

const HomePage = () => {
  const onHover = () => {
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      emojis: ['❤️', '😘', '🤯', '🔥'],
    })
  }

  return (
    <>
      <header className="flex items-center justify-between px-5 py-5">
        <p className="text-2xl font-heading">Inquire</p>
        <div className="flex items-center justify-center">
          <GitHubStars />
          <GetStartedButton />
        </div>
      </header>
      <main className="mt-10">
        <h1 className="text-6xl leading-tight text-center">
          <span className="text-black">
            Create{' '}
            <span
              className="text-indigo-500 border-b-4 border-gray-300"
              onMouseOver={onHover}
            >
              Free
            </span>{' '}
            Forms &amp; Surveys In Minutes.
          </span>
          <br />
          <span className="text-gray-400">
            With Stunning Designs &amp; Zero Coding.
          </span>
        </h1>
        <p className="max-w-3xl mx-auto mt-8 text-2xl leading-snug tracking-wide text-center text-gray-900 font-heading mb-9">
          Asking questions with good looking forms should’ve never been{' '}
          <em>pricey</em>, <em>bloated</em> or <em>heavily branded</em>. Not
          Anymore.
        </p>

        <QuickFacts />

        <SeeDemoButton />
      </main>
    </>
  )
}

export default HomePage

// const JoinDiscordButton = () => {
//   return (
//     <svg
//       width="40"
//       height="38.732"
//       viewBox="0 0 71 55"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clip-path="url(#clip0)">
//         <path
//           d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
//           fill="#23272A"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0">
//           <rect width="71" height="55" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>
//   )
// }

const GetStartedButton = () => {
  return (
    <button className="bg-[#2c2c2c] text-white rounded-lg px-5 py-3 font-heading tracking-wider text-sm">
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
    />
  )
}

const HappyEmojiIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
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
      className="w-6 h-6"
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
      className="w-6 h-6"
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
      className="w-6 h-6"
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
      className="w-6 h-6"
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

const QuickFactItem = ({ renderIcon, children }) => {
  return (
    <li className="flex items-center justify-center gap-x-1">
      <span className="text-orange-600">{renderIcon()}</span>
      <span>{children}</span>
    </li>
  )
}
const QuickFacts = () => {
  return (
    <ul className="flex items-center justify-center mx-auto text-sm tracking-wide font-heading gap-x-6">
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
    <button className="flex items-center justify-center mx-auto my-10 text-xl tracking-wide text-center text-indigo-600 font-heading">
      See It In Action &gt;
    </button>
  )
}
