import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, CreateChatCompletionResponse } from "openai"
import { useState } from "react"
import ChatRoom from "src/client/components/chatroom"
import { chatApis } from "src/client/endpoints/chat"
import useApi from "src/client/hooks/useApi"
import { generateRandomId } from "src/client/libs/text"
import { IChatMessageAndToken } from "src/typing/chatgpt"

export default function Home() {
  const [currentChatMessages, setCurrentChatMessages] = useState<IChatMessageAndToken[]>([])
  const [chatInput, setChatInput] = useState<string>("")
  const { fetchApi, onProgress } = useApi()

  const sendMessage = async (message: string) => {
    const newMessages = [...currentChatMessages]
    const requestMessage: ChatCompletionRequestMessage[] = [
      {
        role: "user",
        content: chatInput
      }
    ]
    const userMessage: IChatMessageAndToken = {
      messageId: generateRandomId(),
      tokenUsed: undefined,
      message: {
        role: "user",
        content: chatInput
      }
    }

    newMessages.push(userMessage)

    setChatInput("")
    setCurrentChatMessages(newMessages)

    fetchApi<ChatCompletionRequestMessage[], CreateChatCompletionResponse>(chatApis.sendChatMessageApi, requestMessage).then((result) => {
      if (!result) return

      const responseMessages = result.choices.reduce((acc, choice) => {
        const replacedMessage = choice.message?.content.replaceAll("\n", "</br>")
        const message: ChatCompletionResponseMessage = {
          role: choice.message?.role || "assistant",
          content: replacedMessage || ""
        }

        const chatItem: IChatMessageAndToken = {
          messageId: result.created.toString(),
          tokenUsed: result.usage,
          message: message
        }

        acc.push(chatItem)

        return acc
      }, [] as IChatMessageAndToken[])

      const newChatMessages = [...newMessages, ...responseMessages]

      setCurrentChatMessages(newChatMessages)
    }).catch((error) => {
      const errorMessage: IChatMessageAndToken = {
        messageId: generateRandomId(),
        tokenUsed: undefined,
        message: {
          role: "system",
          content: "系統錯誤，請稍後再試"
        }
      }

      const newChatMessages = [...newMessages, errorMessage]

      setCurrentChatMessages(newChatMessages)
    })
  }

  const clearChat = () => {
    fetchApi(chatApis.deleteChatApi).then(() => {
      setCurrentChatMessages([])
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    sendMessage(chatInput)
  }

  return (
    <div className="px-4 flex flex-col items-center">
      <h1
        className="text-4xl font-bold text-center"
      >ChatGPT</h1>
      <div className="container">
        <ChatRoom messages={currentChatMessages} />
        <div
          className="w-full flex justify-between"
        >
          <div className="w-64">
            <button
              type="button"
              onClick={clearChat}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >Clear Conversation</button>
          </div>
          <form
            action="POST"
            onSubmit={handleSubmit}
            className="w-full justify-end flex"
          >
            <input
              className="border-gray-600 rounded-lg border py-2 w-6/12 px-2"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold ml-2 py-2 px-4 rounded"
              type="submit"
            >Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
