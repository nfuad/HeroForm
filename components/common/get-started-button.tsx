import Link from 'next/link'
import { ROUTES } from '@constants/routes'
import { EVENTS } from '@constants/events'

export const GetStartedButton = ({ large = false }) => {
  return (
    <Link href={ROUTES.CONTINUE}>
      <a
        onClick={() => umami(EVENTS.SIGN_UP_BUTTON_CLICKED)}
        className={`bg-[#2c2c2c] hover:bg-gradient-to-r hover:from-gray-900 hover:to-indigo-800 transition-all duration-1000 text-white rounded-lg px-5 py-2 transform-gpu font-heading tracking-wider shadow-md hover:shadow-lg flex justify-center items-center group ${
          large
            ? 'text-sm md:text-lg px-6 py-3 lg:py-5 lg:px-10'
            : 'text-xs xl:text-sm'
        }`}
      >
        <span className="mr-1 transition-all group-hover:mr-3">
          Get Started For Free
        </span>
        <ArrowRightIcon />
        <style jsx>{`
          button {
            box-shadow: 0px 13.6301px 35.58px -6.81507px #cfcfcf;
          }
        `}</style>
      </a>
    </Link>
  )
}

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
)
