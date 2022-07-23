import { useRouter } from 'next/router'

import { BackIcon } from './icons'

const BackButton = ({ route }) => {
  const router = useRouter()

  const onClick = () => {
    if (route) {
      router.push(route)
    } else {
      router.back()
    }
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
