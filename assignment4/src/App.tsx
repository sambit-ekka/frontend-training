import { Layout, PageHeader } from 'antd'
import 'antd/dist/antd.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Todo from './components/TodoList/Todo'

const client = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Layout.Content>
          <PageHeader>
            <Todo />
          </PageHeader>
        </Layout.Content>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
