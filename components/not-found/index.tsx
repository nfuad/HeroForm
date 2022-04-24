import Link from 'next/link'
import { ROUTES } from '@constants/routes'

export const Header = () => (
  <div className="flex flex-col mb-10 gap-y-3 lg:gap-y-5">
    <h1 className="text-2xl tracking-wide lg:text-5xl font-heading text-violet-900">
      404 - Not Found
    </h1>
    <h2 className="text-lg tracking-wide text-gray-900 lg:text-2xl">
      {"Tough luck, the page you're looking for doesn't exist."}
    </h2>
  </div>
)

export const Description = () => (
  <p className="max-w-sm text-base lg:text-lg font-body">
    {
      "You must've clicked on a wrong link. You only had one job, and you messed it up. You should probably go back to the "
    }
    <Link href={ROUTES.HOME}>
      <a className="px-1 italic underline bg-red-200 py-0.5 rounded-md">
        home page
      </a>
    </Link>
    .
  </p>
)

export const Container = ({ children }) => (
  <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl px-4 m-auto text-center">
    {children}
  </div>
)
