import { createContext, useState } from 'react'
import { ChatMessage } from 'src/client/components/chatroom'

const chatReducer = (): ChatContext => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatId, setChatId] = useState<string>('')

  const update = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const clearChat = () => {
    setMessages([])
  }

  return {
    messages,
    chatId,
    update,
    clearChat,
  }
}

const ChatContext = createContext<ChatContext>({
  messages: [],
  chatId: '',
  update: () => {},
  clearChat: () => {},
})

const ChatProvider = ({ ...props }: ChatContextProperties) => {
  const chat = chatReducer()

  return (
    <ChatContext.Provider value={chat}>{props.children}</ChatContext.Provider>
  )
}

export type ChatContextProperties = {
  children: JSX.Element | JSX.Element[]
}

export type ChatContext = {
  messages: ChatMessage[]
  chatId: string
  update: (message: ChatMessage) => void
  clearChat: () => void
}

export { ChatProvider }
