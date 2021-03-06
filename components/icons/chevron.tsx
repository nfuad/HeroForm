export const ChevronIcon = ({ style }: any) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${style}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={4}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </div>
  )
}
