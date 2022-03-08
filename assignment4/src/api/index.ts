export const CACHE_KEY = 'query-todo'
export const LS_KEY = 'todos'

const generateKey = (keyInput: string): string => {
  return `${keyInput} _${new Date().getTime()}`
}

export const getTodos: GetTodos = () => {
  return JSON.parse(window.localStorage.getItem(LS_KEY) || '[]')
}

export const addTodo: AddTodo = (todoText: string) => {
  const todos = getTodos()
  const newTodo: ITodo = {
    id: generateKey(todoText),
    text: todoText,
    completed: false,
  }
  todos.push(newTodo)
  window.localStorage.setItem(LS_KEY, JSON.stringify(todos))
}

export const editTodo: EditTodo = (todoId: string, todoText: string) => {
  const todos = getTodos()
  const mutatedTodos = todos.map((todo) => {
    if (todo.id === todoId) todo.text = todoText
    return todo
  })
  window.localStorage.setItem(LS_KEY, JSON.stringify(mutatedTodos))
}

export const removeTodo: RemoveTodo = (todoId: string) => {
  const todos = getTodos()
  const mutatedTodos = todos.filter((todo) => todo.id !== todoId)
  window.localStorage.setItem(LS_KEY, JSON.stringify(mutatedTodos))
}

export const toggleTodo: ToggleTodo = (todoId: string) => {
  const todos = getTodos()
  const mutatedTodos = todos.map((todo) => {
    if (todo.id === todoId) todo.completed = !todo.completed
    return todo
  })
  window.localStorage.setItem(LS_KEY, JSON.stringify(mutatedTodos))
}
