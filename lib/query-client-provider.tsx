import axios from 'axios'
import { QueryClientProvider, QueryClient } from 'react-query'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`)
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

const ReactQueryClientProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryClientProvider
