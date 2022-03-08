import { Button, Checkbox, List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

interface TodoInstanceProps {
  todo: ITodo
  onClick: () => void
  toggleEditModal: () => void
  handleRemove: (todoId: string) => void
  handleToggle: (todoId: string) => void
}

const TodoInstance: React.FC<TodoInstanceProps> = ({
  todo,
  onClick,
  toggleEditModal,
  handleRemove,
  handleToggle,
}) => {
  const { id, text, completed } = todo

  return (
    <List.Item
      actions={[
        <Checkbox value={completed} onClick={() => handleToggle(id)} />,
        <Button key='edit' onClick={toggleEditModal}>
          Edit
        </Button>,
        <Button key='delete' onClick={() => handleRemove(id)}>
          <DeleteOutlined />
        </Button>,
      ]}
      onClick={onClick}
    >
      <List.Item.Meta title={text} />
    </List.Item>
  )
}

export default TodoInstance
