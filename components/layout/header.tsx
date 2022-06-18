import { useState } from 'react'
import { SITE_DATA } from '@constants/site-data'
import { GetStartedButton } from '@components/common'
import { useRouter } from 'next/router'
import { ROUTES } from '@constants/routes'
import Link from 'next/link'
import { LogOutIcon, ChevronDownIcon } from '../icons'
import { useAuth } from '@lib/auth/provider'
import { signOut } from 'firebase/auth'
import { auth } from '@lib/init-firebase'

export const Header = () => {
  const router = useRouter()
  const isHome = router.pathname === ROUTES.HOME

  return (
    <header className="flex items-center justify-between px-5 py-5 mx-auto max-w-7xl">
      <Link href={ROUTES.HOME}>
        <a className="text-lg transition-all duration-100 sm:text-xl font-heading hover:text-gray-500">
          {SITE_DATA.name}
        </a>
      </Link>

      {isHome ? (
        <>
          <div className="flex items-center justify-center mr-16 xl:mr-12 2xl:mr-0 sm:gap-x-6">
            <div className="flex items-center justify-center gap-x-4">
              <JoinDiscordButton />
              <JoinGitHubButton />
              {/* <GitHubStars /> */}
            </div>

            <div className="flex items-center justify-center gap-x-5">
              <Link href={ROUTES.CONTINUE}>
                <a className="hidden text-base transition-all duration-100 sm:block font-body hover:text-gray-500">
                  {ROUTES.CONTINUE}
                </a>
              </Link>

              <GetStartedButton />
            </div>
          </div>
        </>
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
        width="20"
        viewBox="0 0 71 55"
        fill="none"
        className="hidden sm:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <path
            d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
            fill="#000"
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
    <div className="absolute top-0 right-0 ignore-reveal">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/nfuad/HeroForm"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <svg
          width={80}
          height={80}
          viewBox="0 0 250 250"
          className="absolute top-0 right-0"
          style={{
            fill: '#151513',
            color: '#fff',
            border: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>

      <style jsx>{`
        .github-corner:hover .octo-arm {
          animation: octocat-wave 560ms ease-in-out;
        }
        @keyframes octocat-wave {
          0%,
          100% {
            transform: rotate(0);
          }
          20%,
          60% {
            transform: rotate(-25deg);
          }
          40%,
          80% {
            transform: rotate(10deg);
          }
        }
        @media (max-width: 500px) {
          .github-corner:hover .octo-arm {
            animation: none;
          }
          .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
        }
      `}</style>
    </div>
  )
}

const DropDown = () => {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="relative transition-all">
      <div
        className={`rounded-md border px-3 py-2 hover:border-gray-900 transition-all cursor-pointer ${
          open ? 'border-gray-500' : 'border-gray-200'
        }`}
        onClick={() => setOpen((st) => !st)}
      >
        <div className="flex items-center justify-start gap-x-2">
          {
            // have to use <img> tag here because we don't know the google domains :)
            // eslint-disable-next-line
            <img
              alt="avatar"
              src={user?.photoURL}
              className="h-6 border-2 rounded-full border-violet-500"
            />
          }
          <p className="font-heading">{user?.displayName}</p>
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </div>
      </div>
      <div
        className={`min-w-max shadow-lg rounded-md border transform-gpu transition-all absolute z-[101] bg-white ${
          open
            ? 'scale-100 translate-y-0 visible'
            : 'scale-0 -translate-y-1/2 hidden'
        } `}
      >
        <div className={'block px-4 py-4 text-sm border-b border-b-gray-200'}>
          <p>Signed in as</p>
          <p className="tracking-wide break-all font-heading">{user?.email}</p>
        </div>
        <div className={'text-gray-700 block px-4 py-2 text-sm'}>
          <button
            className="flex items-center justify-between w-full"
            onClick={() => signOut(auth)}
          >
            <span>Sign Out</span> <LogOutIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
