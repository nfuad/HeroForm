import Link from 'next/link'
import { ROUTES } from '@constants/routes'

export const GetStartedButton = () => {
  return (
    <Link href={ROUTES.CONTINUE}>
      <a className="bg-[#2c2c2c] bg-gradient-to-r hover:from-gray-900 hover:to-indigo-800 transition-all duration-1000 text-white rounded-lg px-5 py-3 transform-gpu hover:scale-105 font-heading tracking-wider text-xs xl:text-sm">
        Get Started For Free
        <style jsx>{`
          button {
            box-shadow: 0px 13.6301px 35.58px -6.81507px #cfcfcf;
          }
        `}</style>
      </a>
    </Link>
  )
}
