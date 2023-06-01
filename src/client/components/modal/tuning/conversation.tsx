import { ChatMessage } from '../../chatroom'

const Conversation = ({ ...props }: ChatMessage) => {
  return (
  <div>
    
  </div>
  )
}

export type ConversationProps = {
  message: ChatMessage
  onchoose: (conversation: ChatMessage) => void
  chosen: boolean
}

export default Conversation
