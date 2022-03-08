declare interface ITodo {
  id: string
  text: string
  completed: boolean
}

type GetTodos = () => ITodo[]
type AddTodo = (todoText: string) => void
type RemoveTodo = (todoId: string) => void
type EditTodo = (todoId: string, todoText: string) => void
type ToggleTodo = (todoId: string) => void
