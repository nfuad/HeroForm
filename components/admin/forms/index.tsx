import Link from 'next/link'
import { FC } from 'react'
import { useForms } from './use-forms'

const Forms: FC = () => {
  const { forms, loading, error } = useForms()

  const renderForms = () => {
    return forms.map((form) => (
      <Link key={form.id} href={`/admin/${form.id}`}>
        <a className="flex-shrink-0 w-full max-w-sm">{form.spreadsheetId}</a>
      </Link>
    ))
  }

  if (loading) return <p>Loading like a pro</p>
  if (error) return <p>Data just won&apos;t load</p>

  return (
    <div className="flex flex-wrap items-center gap-y-4 gap-x-12">
      {renderForms()}
    </div>
  )
}

export default Forms
