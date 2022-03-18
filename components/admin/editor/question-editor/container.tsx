import { FC } from 'react'

const Container: FC = ({ children }) => {
  return (
    <div className="flex flex-col self-stretch justify-center flex-grow p-24 bg shadow-spread rounded-2xl">
      <style jsx>{`
        .bg {
          background-image: url('/background.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
      {children}
    </div>
  )
}

export default Container
