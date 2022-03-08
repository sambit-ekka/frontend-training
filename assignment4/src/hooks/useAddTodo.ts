import { useMutation } from 'react-query'
import { addTodo, removeTodo } from '../api'

const useAddTodo = () => {
  return useMutation(async (todoText: string) => {
    addTodo(todoText)
  }, {})
}

export default useAddTodo
