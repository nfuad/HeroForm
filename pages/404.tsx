import Link from 'next/link'
import Layout from '@components/layout'
import { ROUTES } from '@constants/routes'

const Page = () => {
  return (
    <Layout title="404 - Not Found">
      <div className="flex flex-col items-center justify-center w-full h-screen max-w-3xl m-auto text-center">
        <div className="flex flex-col mb-10 gap-y-5">
          <h1 className="text-5xl tracking-wide font-heading text-violet-900">
            404 - Not Found
          </h1>
          <h2 className="text-2xl tracking-wide text-gray-900">
            Tough luck, the page you're looking for doesn't exist.
          </h2>
        </div>
        <p className="max-w-sm text-lg font-body">
          You must've clicked on a wrong link. You only had one job, and you
          messed it up. You should probably go back to the{' '}
          <Link href={ROUTES.HOME}>
            <a className="px-1 italic underline bg-red-200 py-0.5 rounded-md">
              home page
            </a>
          </Link>
          .
        </p>
      </div>
    </Layout>
  )
}

export default Page
