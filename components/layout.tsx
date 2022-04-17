import { FC, HTMLAttributes } from 'react'
import { NextSeo } from 'next-seo'
import { signOut } from 'next-auth/react'
import { SITE_DATA } from '@constants/site-data'
import { GetStartedButton } from '@components/common'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import toast from 'react-hot-toast'
import { Container, Loader } from './continue'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { LogOutIcon } from './icons'

type Props = {
  title?: string
  showHeader?: boolean
  showFooter?: boolean
  isProtected?: boolean
}

type LayoutProps = Props & HTMLAttributes<HTMLElement>

const Layout: FC<LayoutProps> = ({
  children,
  title,
  showHeader = false,
  showFooter = false,
  isProtected = false, // for protected routes like admin
}) => {
  const router = useRouter()
  const { status } = useSession({
    required: isProtected,
    onUnauthenticated: () => {
      toast.error('You must be signed in to continue')
      router.push(ROUTES.CONTINUE)
    },
  })

  const isLoading = status === 'loading'
  const isUnauthenticated = status === 'unauthenticated'

  if (isProtected) {
    if (isLoading) {
      return (
        <Container>
          <Loader />
        </Container>
      )
    }
    if (isUnauthenticated) return null
  }

  const pageTitle = title ? `${title} | ${SITE_DATA.title}` : SITE_DATA.title

  return (
    <>
      <NextSeo
        title={pageTitle}
        canonical={SITE_DATA.canonical_url}
        description={SITE_DATA.description}
        twitter={{
          handle: SITE_DATA.twitter_user,
        }}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: SITE_DATA.canonical_url,
          site_name: SITE_DATA.title,
        }}
      />
      {showHeader && <Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout

const Footer = () => {
  const router = useRouter()
  const isHome = router.pathname === ROUTES.HOME

  return (
    <footer className="flex flex-col items-center justify-center w-full mx-auto mt-auto text-center my-14">
      {isHome && (
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
      )}
      <p className="text-sm text-gray-500">
        Copyright Ⓒ {new Date().getFullYear()} Inquire. All rights reserved.
      </p>
    </footer>
  )
}

const DropDown = () => {
  const { data } = useSession()

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // see: https://tailwindui.com/components/application-ui/elements/dropdowns
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <div className="flex items-center justify-start gap-x-2">
            <img
              src={data?.user?.image}
              className="h-6 border-2 rounded-full border-violet-500"
            />
            <p className="font-heading">{data?.user?.name}</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    'block px-4 py-4 text-sm border-b border-b-gray-200',
                  )}
                >
                  <p>Signed in as</p>
                  <p className="tracking-wide font-heading">
                    {data?.user?.email}
                  </p>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  <button
                    className="flex items-center justify-between w-full"
                    onClick={() => signOut()}
                  >
                    <span>Sign Out</span> <LogOutIcon />
                  </button>
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
const Header = () => {
  const router = useRouter()
  const isHome = router.pathname === ROUTES.HOME

  return (
    <header className="flex items-center justify-between px-5 py-5 mx-auto max-w-7xl">
      <Link href={ROUTES.HOME}>
        <a className="text-lg sm:text-xl font-heading">Inquire</a>
      </Link>
      {isHome ? (
        <div className="flex items-center justify-center gap-x-5">
          <JoinDiscordButton />
          <JoinGitHubButton />
          {/* <GitHubStars /> */}
          <GetStartedButton />
        </div>
      ) : (
        <DropDown />
      )}
    </header>
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

const JoinDiscordButton = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://discord.gg/tgTcHHEh9s"
      className="transition-all duration-75 hover:scale-110 hover:shadow-lg transform-gpu hover:rotate-12"
    >
      <svg
        width="25"
        viewBox="0 0 71 55"
        fill="none"
        className="hidden sm:block"
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
    </a>
  )
}

const JoinGitHubButton = () => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/nfuad/inquire"
      className="transition-all duration-75 hover:scale-110 hover:shadow-lg transform-gpu hover:rotate-12"
    >
      <Image
        width="25"
        height="25"
        src={require('../public/images/github-logo.png')}
      />
    </a>
  )
}
