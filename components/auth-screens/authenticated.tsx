import { ChevronRightIcon, LogOutIcon } from '@components/icons'
import { User } from 'firebase/auth'
import { FC } from 'react'

type Props = {
  handleContinueClick: () => void
  handleSignOutClick: () => void
  user: User
}

export const Authenticated: FC<Props> = ({
  handleContinueClick,
  handleSignOutClick,
  user,
}) => (
  <>
    <h1 className="text-2xl ">{"You're Logged In"}</h1>
    <div className="w-full">
      <h2 className="pb-2 tracking-wide">Continue with -</h2>
      <button
        onClick={handleContinueClick}
        className="flex items-center justify-between w-full px-6 py-3 transition-all duration-75 border border-gray-200 rounded-lg hover:shadow-lg gap-x-2 hover:scale-105"
      >
        <div className="flex justify-between gap-x-2">
          {/* eslint-disable-next-line */}
          <img
            alt="avatar"
            src={user?.photoURL}
            className="h-12 w-12 border-2 rounded-full border-violet-500"
          />{' '}
          <div className="flex flex-col items-start justify-start text-sm gap-y-1">
            <p className="font-heading">{user?.displayName}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <ChevronRightIcon />
      </button>

      <h2 className="pb-2 tracking-wide mt-9">Or, Choose Another Account -</h2>
      <button
        onClick={handleSignOutClick}
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full"
      >
        <span className="mr-auto">Log Out First</span> <LogOutIcon />
      </button>
    </div>
  </>
)
