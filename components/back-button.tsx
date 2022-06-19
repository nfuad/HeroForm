import { useRouter } from 'next/router'

import { ROUTES } from '@constants/routes'
import { BackIcon } from './icons'

const BackButton = () => {
  const router = useRouter()

  const onClick = () => {
    const id = router.query.id
    router.push(`/${id}${ROUTES.EDIT}`)
  }

  return (
    <button
      className="text-gray-900 transition-all duration-75 cursor-pointer hover:text-gray-700"
      onClick={onClick}
    >
      <BackIcon />
    </button>
  )
}

export default BackButton
