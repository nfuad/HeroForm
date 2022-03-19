import { FC } from 'react'
import Button from '../button'
import { Question } from './editor/types'

type Props = {
  questions: Question[]
}

const Header: FC<Props> = ({ questions }) => {
  const handlePublish = () => {
    fetch('/api/publish-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions }),
    })
  }
  return (
    <header className="flex items-center px-12 py-4 gap-x-7">
      <h1 className="flex-grow text-2xl">My Super Amazing Survey</h1>
      <Button className="min-w-[9rem]" onClick={handlePublish}>
        Publish
      </Button>
    </header>
  )
}

export default Header
