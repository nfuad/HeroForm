import { ROUTES } from '@constants/routes'
import { SITE_DATA } from '@constants/site-data'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Footer = () => {
  const router = useRouter()
  const isHome = router.pathname === ROUTES.HOME

  return (
    <footer className="flex flex-col items-center justify-center w-full mx-auto mt-auto text-center my-14">
      <div className="flex items-center justify-center my-5 gap-x-6">
        <Link href="/privacy">
          <a className="text-sm text-gray-600 transition-all hover:text-gray-900 hover:tracking-wider">
            Privacy Policy
          </a>
        </Link>
        <Link href="/terms">
          <a className="text-sm text-gray-600 transition-all hover:text-gray-900 hover:tracking-wider">
            Terms of Service
          </a>
        </Link>
        <Link href="/contact">
          <a className="text-sm text-gray-600 transition-all hover:text-gray-900 hover:tracking-wider">
            Contact
          </a>
        </Link>
        <Link href="/about">
          <a className="text-sm text-gray-600 transition-all hover:text-gray-900 hover:tracking-wider">
            About
          </a>
        </Link>
      </div>
      {isHome && (
        <p className="pb-6 text-sm leading-tight sm:text-base font-heading">
          <span>Created with</span>
          &nbsp;<span className="animate animate-pulse">❤️</span>
          &nbsp;&nbsp;
          <span>
            {' '}
            by{' '}
            <Link href="/folks">
              <a>folks.</a>
            </Link>
          </span>
          <br />
          <span>You dare not copy us or we&apos;ll sue you 👀</span>
        </p>
      )}

      <p className="text-xs text-gray-500 sm:text-sm">
        Copyright Ⓒ {new Date().getFullYear()} {SITE_DATA.name}. All rights
        reserved.
      </p>
    </footer>
  )
}
