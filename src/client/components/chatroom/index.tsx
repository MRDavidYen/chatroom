import { useContext, useEffect, useRef, useState } from 'react'
import ChatItemMemo from './chatItem'
import LoadingAnimation from '../loading'
import { ChatContext } from 'src/client/contexts/chat'
import { generateRandomId } from 'src/client/libs/text'

const ChatRoom = ({ ...props }: IChatRoomProps) => {
  const chatContext = useContext(ChatContext)

  const abortControllerRef = useRef<AbortController>(new AbortController())

  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }

  const onStreamingEnded = (message: string) => {
    chatContext.update({
      id: generateRandomId(),
      message: message,
      role: 'assistant',
    })
    setLoading(false)
  }

  useEffect(() => {
    scrollToBottom()

    if (props.inputMessage) {
      setLoading(true)
      setMessages([...messages, props.inputMessage])
    }
  }, [props.inputMessage])

  return (
    <div
      ref={containerRef}
      className='p-10 my-4 border border-gray-600 bg-gray-700 rounded-md max-h-[80vh] overflow-y-auto'
    >
      {messages && messages.length > 0 ? (
        messages.map((item, index) => {
          return (
            <ChatItemMemo
              message={item}
              key={item.id}
              abort={abortControllerRef.current}
              onStreamingEnded={onStreamingEnded}
            />
          )
        })
      ) : (
        <div className='text-center text-2xl text-white font-bold'>
          <h2>Submit message to start conversation.</h2>
        </div>
      )}
      <LoadingAnimation isShow={loading} />
    </div>
  )
}

export type ChatMessage = {
  id: string
  message: string
  role?: 'user' | 'assistant' | 'system'
}

export interface IChatRoomProps {
  inputMessage?: ChatMessage
}

export default ChatRoom
