import { ChatCompletionRequestMessage } from 'openai'
import { chatIdCookieName } from 'src/constants/caching'
import {
  createChatCompletionStreaming,
  getChatData,
  storeChatDataIntoMemory,
} from 'src/server/services/chatgpt'
import { AxiosResponse } from 'axios'
import {
  ChatStreamingChunk,
  ChatStreamingCompletionResponse,
} from 'src/typing/chatgpt'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  apiMiddleware,
  CustomNextApiResponse,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { deleteCookie, setCookie } from 'src/server/persistants/cookies'
import { v4 as uuidv4 } from 'uuid'

async function POST(request: NextApiRequest, response: CustomNextApiResponse) {
  try {
    let messages: ChatCompletionRequestMessage[] = await request.body
    const chatId = request.cookies[chatIdCookieName] || ''

    if (chatId) {
      const pastMessages = await getChatData(chatId)

      if (pastMessages) {
        messages = [...pastMessages, ...messages]
      }
    } else {
      setCookie(response, chatIdCookieName, uuidv4())
    }

    storeChatDataIntoMemory(chatId, messages)

    const chatCompletion = (await createChatCompletionStreaming(
      messages
    )) as AxiosResponse<ChatStreamingCompletionResponse>

    if (chatCompletion && chatCompletion.status === 200) {
      response.setHeader('Content-Type', 'text/event-stream')
      response.setHeader('Connection', 'keep-alive')
      response.setHeader('Cache-Control', 'no-cache')
      response.setHeader('X-Accel-Buffering', 'no')

      chatCompletion.data.on('data', (data) => {
        const lines = data
          .toString()
          .split('\n')
          .filter((line) => line.trim() !== '')

        for (const line of lines) {
          const message = line.replace(/^data: /, '')
          if (message === '[DONE]') {
            response.end()

            return
          }
          try {
            const parsed = JSON.parse(message) as ChatStreamingChunk
            console.log(parsed.choices[0].delta)

            response.write(`data: ${message}\n\n`)
            response.flush()
          } catch (error) {
            console.error('Could not JSON parse stream message', message, error)
            response.end()
          }
        }
      })
    } else {
      return response.status(500).json({ message: 'Could not create chat' })
    }
  } catch (error) {
    return response.status(500).json({ message: 'Could not create chat' })
  }
}

async function DELETE(request: NextApiRequest, response: NextApiResponse) {
  const chatId = request.cookies[chatIdCookieName] || ''

  if (chatId) {
    deleteCookie(response, chatIdCookieName)

    return response.status(200).json({ message: 'Deleted chat' })
  }

  return response.status(500).json({ message: 'Could not delete chat' })
}

const handler: MultipleMethodHandler = {
  POST,
  DELETE,
}

export default apiMiddleware(handler)
