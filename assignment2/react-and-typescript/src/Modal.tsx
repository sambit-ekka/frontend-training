import { FC, MouseEventHandler } from 'react'

interface Props {
  open: boolean
  onClose: MouseEventHandler
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  if (!open) return null
  return (
    <>
      <div className='modal-overlay'></div>
      <div className='modal'>
        <button onClick={onClose}>Close Modal</button>
        {children}
      </div>
    </>
  )
}

export default Modal
