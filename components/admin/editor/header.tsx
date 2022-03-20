import { FC } from 'react'
import Button from '@components/button'
import { Question } from './types'
import { useRouter } from 'next/router'

type Props = {
  questions: Question[]
}

const Header: FC<Props> = ({ questions }) => {
  const router = useRouter()
  const { id } = router.query as Record<string, string>

  const handlePublish = () => {
    fetch('/api/publish-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questions, id }),
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
