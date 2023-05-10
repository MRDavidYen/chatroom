import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, CreateChatCompletionResponse } from "openai"
import { useState } from "react"
import ChatRoom, { ChatMessage } from "src/client/components/chatroom"
import { chatApis } from "src/client/endpoints/chat"
import useApi from "src/client/hooks/useApi"
import { generateRandomId } from "src/client/libs/text"
import { IChatMessageAndToken } from "src/typing/chatgpt"

export default function Home() {
  const [chatInput, setChatInput] = useState<string>("")
  const [submitMessage, setSubmitMessage] = useState<ChatMessage>()


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (chatInput) {
      setSubmitMessage({
        id: generateRandomId(),
        message: chatInput,
      })

      setChatInput("")
    }
  }

  return (
    <div className="px-4 flex flex-col bg-gray-800 items-center">
      <h1
        className="text-4xl font-bold text-center text-white"
      >ChatGPT</h1>
      <div className="container">
        <ChatRoom
          inputMessage={submitMessage}
        />
        <div
          className="w-full flex justify-between"
        >
          {/* <div className="w-64">
            <button
              type="button"
              onClick={clearChat}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >Clear Conversation</button>
          </div> */}
          <form
            action="POST"
            onSubmit={handleSubmit}
            className="w-full justify-end flex"
          >
            <input
              className="border-gray-600 bg-slate-600 text-white rounded-lg border py-2 w-6/12 px-2"
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              className="bg-green-800 hover:bg-green-700 text-white font-bold ml-2 py-2 px-4 rounded"
              type="submit"
            >Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
