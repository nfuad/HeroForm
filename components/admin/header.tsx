import { FC } from 'react'
import Button from '../button'

const Header: FC = () => {
  return (
    <header className='flex items-center px-12 py-4 gap-x-7'>
      <h1 className='flex-grow text-2xl font-heading'>
        My Super Amazing Survey
      </h1>
      <Button
        className='min-w-[9rem]'
        bgColor='bg-[#FFE6C7]'
        textColor='text-black'
      >
        Preview
      </Button>
      <Button className='min-w-[9rem]'>Publish</Button>
    </header>
  )
}

export default Header
