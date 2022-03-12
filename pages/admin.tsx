import Editor from '../components/admin/editor'
import Header from '../components/admin/header'

const AdminPage = () => {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50">
      <Header />
      <Editor />
    </div>
  )
}

export default AdminPage
