import { NextPage } from 'next'
import Forms from '@components/admin/forms'
import Button from '@components/button'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

const AdminPage: NextPage = () => {
  const router = useRouter()

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/create-form', {
        method: 'POST',
      })
      const data = await response.json()

      toast.success('Form created!')

      const { id } = data
      router.push(`/admin/${id}`)
    } catch (error) {
      toast.error('Failed to create form')
    }
  }

  return (
    <>
      <div className="flex flex-col p-8 gap-y-12">
        <Button className="self-end" onClick={handleCreate}>
          + Create Form
        </Button>
        <Forms />
      </div>
    </>
  )
}

export default AdminPage
