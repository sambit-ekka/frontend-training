import { useMutation } from 'react-query'
import { editTodo } from '../api'

const useEditTodo = () => {
  return useMutation(
    async ({ todoId, todoText }: { todoId: string; todoText: string }) => {
      editTodo(todoId, todoText)
    },
    {}
  )
}

export default useEditTodo
