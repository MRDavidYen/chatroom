import { useContext } from 'react'
import { ChatContext } from 'src/client/contexts/chat'
import ExportIcon from '../icons/export'
import SideFiles from './files'
import FineTuning from './tuning'

const SideMenuItems = () => {
  const chatContext = useContext(ChatContext)

  return (
    <div className={`side-items p-4`}>
      <div>
        <h4 className=' text-xl text-white'>
          Context Length: {chatContext.messages.length}
        </h4>
        <FineTuning />
        <div className='border border-gray-400 my-2'></div>
        <SideFiles />
      </div>
    </div>
  )
}

export default SideMenuItems
