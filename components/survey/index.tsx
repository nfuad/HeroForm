import { ChevronIcon, WarningIcon } from '@components/icons'

export const ProgressBar = ({ scrollIndicator }) => (
  <div className="absolute top-0 z-50 w-full h-2 bg-gray-200">
    <div
      className="h-2 transition-all duration-1000 ease-in-out bg-gradient-to-r to-gradient-blue-one from-gradient-blue-two"
      style={{ width: `${scrollIndicator}%` }}
    />
  </div>
)

export const Container = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/images/background.svg')`,
      }}
      className="relative w-full h-screen flex justify-center items-center bg-no-repeat bg-cover"
    >
      {children}
    </div>
  )
}

export const DotIndicators = ({
  totalQuestions,
  currentPage,
  setCurrentPage,
  isSubmitted,
}) => {
  if (isSubmitted) return null

  return (
    <div className="hidden md:flex absolute z-50 flex-col items-center justify-center space-y-3 right-5 top-1/2 translate-y-[-50%]">
      {Array.from({ length: totalQuestions }).map((_, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setCurrentPage(index + 1)
            }}
            className={`transition-all duration-300 ease-in-out cursor-pointer ${
              index === currentPage - 1
                ? 'bg-gradient-blue-one w-4 h-4'
                : 'bg-gray-200 w-2 h-2'
            } rounded-full`}
          />
        )
      })}
    </div>
  )
}

export const ArrowNavigator = ({
  handleNext,
  handlePrev,
  isFirstPage,
  isLastPage,
  isSubmitted,
}) => {
  if (isSubmitted) return null

  return (
    <div className="absolute z-50 flex flex-row divide-x-2 divide-gray-300 rounded-lg shadow-3xl bottom-5 right-5">
      <button
        disabled={isFirstPage}
        onClick={handlePrev}
        className="p-3 bg-white rounded-l-lg cursor-pointer disabled:bg-gray-200 disabled:cursor-default disabled:hover:text-black hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <ChevronIcon />
      </button>
      <button
        disabled={isLastPage}
        onClick={handleNext}
        className="p-3 bg-white rounded-r-lg cursor-pointer disabled:hover:bg-gray-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-default hover:bg-gradient-to-r hover:to-gradient-blue-one hover:from-gradient-blue-two hover:text-white"
      >
        <ChevronIcon style="rotate-180" />
      </button>
    </div>
  )
}

export const PreviewBanner = () => {
  return (
    <div className="fixed w-full top-10 z-100">
      <div className="flex items-center justify-center max-w-xs px-3 py-2 mx-auto text-white rounded-lg sm:px-5 md:max-w-sm lg:max-w-md bg-violet-600">
        <span>
          <WarningIcon />
        </span>
        <p className="mx-auto ml-2 text-sm tracking-wide text-center font-body">
          {
            "Preview Mode. Answers won't be submitted unless the actual form link is used."
          }
        </p>
      </div>
    </div>
  )
}
