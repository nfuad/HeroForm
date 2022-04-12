import { FC } from 'react'

const Container: FC = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow p-24 overflow-x-hidden overflow-y-auto border-2 border-violet-100 bg shadow-spread rounded-2xl aspect-video">
      <style jsx>{`
        .bg {
          background-image: url('/background.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
      <div className="flex flex-col items-center w-full m-auto">{children}</div>
    </div>
  )
}

export default Container
