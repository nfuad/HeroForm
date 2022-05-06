export const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen max-w-sm px-4 mx-auto gap-y-5">
      {children}
    </div>
  )
}
