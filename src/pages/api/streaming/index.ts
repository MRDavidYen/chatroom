import { NextRequest, NextResponse } from "next/server"
import { ChatCompletionRequestMessage } from "openai"
import { chatIdCookieName } from "src/constants/caching"
import { setCookie } from "src/server/persistants/cookies"
import { convertResponseToRequestMessage, createChatCompletionStreaming, getChatData, storeChatData } from "src/server/services/chatgpt"
import { AxiosResponse } from "axios"
import { ChatStreamingChunk, ChatStreamingCompletionResponse } from "src/typing/chatgpt"
import { NextApiRequest, NextApiResponse } from "next"
import { apiMiddleware, MultipleMethodHandler } from "src/libs/middleware"

async function POST(request: NextApiRequest, response: NextApiResponse) {
    try {
        let messages: ChatCompletionRequestMessage[] = await request.body
        const chatId = request.cookies[chatIdCookieName] || ''

        if (chatId) {
            const pastMessages = await getChatData(chatId)

            if (pastMessages) {
                messages = [...pastMessages, ...messages]
            }
        }

        const chatCompletion = await createChatCompletionStreaming(messages) as AxiosResponse<ChatStreamingCompletionResponse>

        if (chatCompletion && chatCompletion.status === 200) {
            response.setHeader('Content-Type', 'text/event-stream')
            response.setHeader('Connection', 'keep-alive')
            response.setHeader('Cache-Control', 'no-cache')
            response.setHeader('X-Accel-Buffering', 'no')

            chatCompletion.data.on('data', (data) => {
                const lines = data.toString().split('\n').filter(line => line.trim() !== '')

                for (const line of lines) {
                    const message = line.replace(/^data: /, '')
                    if (message === '[DONE]') {
                        response.end()

                        return
                    }
                    try {
                        const parsed = JSON.parse(message) as ChatStreamingChunk
                        console.log(parsed.choices[0].delta)

                        response.write(`data: ${JSON.stringify(parsed)}\n\n`)

                    } catch (error) {
                        console.error('Could not JSON parse stream message', message, error)
                        response.end()
                    }
                }
            })

            // setCookie(response, chatIdCookieName, chatCompletion.data.id)

            // const newMessages = convertResponseToRequestMessage(chatCompletion.data.choices)
            // const storeMessages = [...messages, ...newMessages]

            // storeChatData(chatCompletion.data.id, storeMessages)
        } else {
            return response.status(500).json({ message: 'Could not create chat' })
        }
    } catch (error) {
        return response.status(500).json({ message: 'Could not create chat' })
    }
}

const handler: MultipleMethodHandler = {
    "POST": POST
}

export default apiMiddleware(handler)