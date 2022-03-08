import { useQuery } from 'react-query'
import { CACHE_KEY, getTodos } from '../api'
import sleep from './sleep'

const useTodos = () => {
  return useQuery<ITodo[]>([CACHE_KEY], async () => {
    await sleep(3000)
    return getTodos()
  })
}

export default useTodos
