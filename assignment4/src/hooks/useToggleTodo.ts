import { useMutation } from 'react-query'
import { toggleTodo } from '../api'

const useToggleTodo = () => {
  return useMutation(async (todoId: string) => {
    toggleTodo(todoId)
  }, {})
}

export default useToggleTodo
