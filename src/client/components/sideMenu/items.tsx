import { useContext } from 'react'
import { ChatContext } from 'src/client/contexts/chat'
import ExportIcon from '../icons/export'

const SideMenuItems = () => {
  const chatContext = useContext(ChatContext)

  return (
    <div className={`side-items p-4`}>
      <div>
        <h4 className=' text-xl text-white'>
          Context Length: {chatContext.messages.length}
        </h4>
        <button
          className={`bg-green-700 text-white rounded-md px-2 py-1 mt-4 mb-2 flex items-center justify-center w-full
          ${
            chatContext.messages.length > 0
              ? 'bg-green-700 text-white'
              : 'bg-gray-500 text-gray-700 cursor-not-allowed'
          }`}
        >
          <ExportIcon
            className={`w-5 h-5 fill-white mr-2 ${
              chatContext.messages.length > 0 ? 'fill-white' : 'fill-gray-700'
            }`}
          />
          <span>Fine-Tuning</span>
        </button>
        {chatContext.messages.length > 0 ? (
          <p className='text-green-500'>Fine-tuning Avaliable</p>
        ) : (
          <div className='text-red-600'>
            <p>Fine-tuning Unavaliable.</p>
            <p>Submit message to start conversation.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenuItems
