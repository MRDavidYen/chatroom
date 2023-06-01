import { useContext, useState } from 'react'
import { ChatContext } from 'src/client/contexts/chat'
import ExportIcon from '../icons/export'
import Modal from '../modal'
import TuningModal from '../modal/tuning'

const FineTuning = () => {
  const chatContext = useContext(ChatContext)
  const [openModal, setOpenModal] = useState(false)

  const onButtonClick = () => {
    if (chatContext.messages.length == 0) return

    setOpenModal(true)
  }

  return (
    <div>
      <button
        className={`rounded-md px-2 py-1 mt-4 mb-2 flex items-center justify-center w-full
          ${
            chatContext.messages.length > 0
              ? 'bg-green-700 text-white'
              : 'bg-gray-500 text-gray-700 cursor-not-allowed'
          }`}
        onClick={onButtonClick}
      >
        <ExportIcon
          className={`w-5 h-5 fill-white mr-2 ${
            chatContext.messages.length > 0 ? 'fill-white' : 'fill-gray-700'
          }`}
        />
        <span>Fine-Tuning</span>
      </button>
      {chatContext.messages.length > 0 ? (
        <p className='text-green-500'>Fine-tuning Available</p>
      ) : (
        <div className='text-red-600'>
          <p>Fine-tuning Unavailable.</p>
          <p>Submit message to start conversation.</p>
        </div>
      )}
      <Modal onClose={() => setOpenModal(false)} isOpen={openModal}>
        <TuningModal />
      </Modal>
    </div>
  )
}

export default FineTuning
