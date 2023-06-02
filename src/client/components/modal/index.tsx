const Modal = ({ ...props }: ModalProps) => {
  return (
    <div
      className={`modal fixed w-screen h-screen flex justify-center items-center top-0 left-0 ${
        props.isOpen ? '' : 'hidden'
      }`}
    >
      <div
        className={`bg-slate-500 shadow-sm z-20 shadow-slate-400 rounded-md 
        min-h-[60vh] min-w-[80%] max-h-[80vh] max-w-[80%] 
        overflow-y-auto p-10`}
      >
        {props.children}
      </div>
      <div
        className={`bg-[#00000050] fixed top-0 left-0 w-screen h-screen z-10`}
        onClick={props.onClose}
      ></div>
    </div>
  )
}

export type ModalProps = {
  children: JSX.Element
  onClose: () => void
  isOpen: boolean
}

export default Modal
