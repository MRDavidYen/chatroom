import { createContext, useState } from 'react'
import { ChatMessage } from 'src/client/components/chatroom'
import { deleteCompletionApi } from 'src/client/endpoints/completion'

const chatReducer = (): ChatContextType => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatId, setChatId] = useState<string>('')

  const update = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message])
  }

  const clearChat = () => {
    setMessages([])

    deleteCompletionApi()
  }

  return {
    messages,
    chatId,
    update,
    updateChatId: setChatId,
    clearChat,
  }
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  chatId: '',
  update: () => {},
  updateChatId: () => {},
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

export type ChatContextType = {
  messages: ChatMessage[]
  chatId: string
  update: (message: ChatMessage) => void
  updateChatId: (chatId: string) => void
  clearChat: () => void
}

export { ChatProvider, ChatContext }
