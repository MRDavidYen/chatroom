import { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionRequestMessage } from 'openai'
import { chatIdCookieName } from 'src/constants/caching'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { setCookie } from 'src/server/persistants/cookies'
import { storeChatDataIntoMemory } from 'src/server/services/chatgpt/chat'
import { v4 as uuidv4 } from 'uuid'

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const message: ChatCompletionRequestMessage[] = request.body
  let chatId = request.cookies[chatIdCookieName] || ''

  if (!chatId) {
    chatId = uuidv4()

    setCookie(response, chatIdCookieName, chatId)
  }

  storeChatDataIntoMemory(chatId, message)

  return response.status(200).json({ message: 'chat stored' })
}

const handler: MultipleMethodHandler = {
  POST: POST,
}

export default apiMiddleware(handler)
