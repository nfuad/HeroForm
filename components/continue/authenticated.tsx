import { ChevronRightIcon, LogOutIcon } from '@components/icons'

export const Authenticated = ({
  handleContinueClick,
  session,
  handleSignOutClick,
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
            src={session?.user?.image}
            className="h-12 border-2 rounded-full border-violet-500"
          />{' '}
          <div className="flex flex-col items-start justify-start text-sm gap-y-1">
            <p className="font-heading">{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
          </div>
        </div>
        <ChevronRightIcon />
      </button>

      <h2 className="pb-2 tracking-wide mt-9">Or, Choose Another Account -</h2>
      <button
        className="flex items-center justify-between w-full px-6 py-2 mx-auto text-sm text-white transition-all duration-75 bg-gray-900 rounded-md hover:scale-105 gap-x-3"
        onClick={handleSignOutClick}
      >
        <span>Log Out First</span> <LogOutIcon />
      </button>
    </div>
  </>
)
