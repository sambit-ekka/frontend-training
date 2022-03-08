import { Button, List, Modal, Form, Input, Result } from 'antd'
import { useQueryClient } from 'react-query'
import { useState } from 'react'
import useRemoveTodo from '../../hooks/useRemoveTodo'
import useTodos from '../../hooks/useTodos'
import { CACHE_KEY } from '../../api'
import TodoInstance from './TodoInstance'
import useToggleTodo from '../../hooks/useToggleTodo'
import useAddTodo from '../../hooks/useAddTodo'
import useEditTodo from '../../hooks/useEditTodo'

const Todo = () => {
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [todoId, setTodoId] = useState('')
  const addTodoResult = useAddTodo()
  const editTodoResult = useEditTodo()
  const removeTodoResult = useRemoveTodo()
  const toggleTodoResult = useToggleTodo()
  const { data, isError, isLoading } = useTodos()
  const queryClient = useQueryClient()

  const handleAdd = ({ todoText }: { todoText: string }) => {
    addTodoResult.mutate(todoText, {
      onSettled: () => {
        queryClient.invalidateQueries(CACHE_KEY)
      },
    })
  }

  const handleRemove = (todoId: string) => {
    removeTodoResult.mutate(todoId, {
      onSettled: () => {
        queryClient.invalidateQueries(CACHE_KEY)
      },
    })
  }

  const handleEdit = ({ todoText }: { todoText: string }) => {
    editTodoResult.mutate(
      { todoId, todoText },
      {
        onSettled: () => {
          queryClient.invalidateQueries(CACHE_KEY)
        },
      }
    )
  }

  const handleToggle = (todoId: string) => {
    toggleTodoResult.mutate(todoId, {
      onSettled: () => {
        queryClient.invalidateQueries(CACHE_KEY)
      },
    })
  }

  if (isError) {
    return <Result status='error' />
  }

  return (
    <>
      <Button type='primary' onClick={() => setVisible(true)}>
        New Todo
      </Button>
      <List
        loading={isLoading}
        dataSource={data}
        renderItem={(todo) => (
          <TodoInstance
            todo={todo}
            onClick={() => setTodoId(todo.id)}
            toggleEditModal={() => setVisibleEdit(!visibleEdit)}
            handleRemove={handleRemove}
            handleToggle={handleToggle}
          />
        )}
      />

      <Modal
        title='TODO'
        visible={visible}
        footer={null}
        destroyOnClose
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form autoComplete='off' onFinish={handleAdd}>
          <Form.Item name='todoText' label='text'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => setVisible(false)}
            >
              Add Todo
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='EDIT'
        visible={visibleEdit}
        footer={null}
        destroyOnClose
        onOk={() => setVisibleEdit(false)}
        onCancel={() => setVisibleEdit(false)}
      >
        <Form autoComplete='off' onFinish={handleEdit}>
          <Form.Item name='todoText' label='text'>
            <Input />
          </Form.Item>
          <Form.Item name='todoId' noStyle>
            <Input type='hidden' value={todoId} />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => setVisibleEdit(false)}
            >
              Edit Todo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Todo
