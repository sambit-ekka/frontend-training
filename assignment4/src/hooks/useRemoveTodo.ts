import { useMutation } from 'react-query'
import { removeTodo } from '../api'

const useRemoveTodo = () => {
  return useMutation(async (todoId: string) => {
    removeTodo(todoId)
  }, {})
}

export default useRemoveTodo
