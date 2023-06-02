import { AxiosResponse } from 'axios'
import { NextApiRequest } from 'next'
import {
  apiMiddleware,
  CustomNextApiResponse,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { createChatCompletionWithModelStreaming } from 'src/server/services/chatgpt/chat'
import {
  ChatStreamingChunk,
  ChatStreamingCompletionResponse,
} from 'src/typing/chatgpt'

async function POST(request: NextApiRequest, response: CustomNextApiResponse) {
  const payload = request.body as CreateCompletionWithModelPayload

  try {
    const chatCompletion = (await createChatCompletionWithModelStreaming(
      payload.prompt,
      payload.model ?? 'gpt-3.5-turbo'
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
            const parsed = JSON.parse(message) as ChatWithModelStreamingChunk
            console.log(parsed.choices[0].text)

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

const handler: MultipleMethodHandler = {
  POST,
}

export type CreateCompletionWithModelPayload = {
  prompt: string
  model?: string | null
}

export type ChatWithModelStreamingChunk = ChatStreamingChunk & {
  choices: ChatWithModelStreamingChoice[]
}

export type ChatWithModelStreamingChoice = {
  text: string
  index: number
  logprobs: any
  finish_reason: string
}

export default apiMiddleware(handler)
