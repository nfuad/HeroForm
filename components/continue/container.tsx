export const Container = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen -mt-20 gap-y-5">
      {children}
    </div>
  )
}
