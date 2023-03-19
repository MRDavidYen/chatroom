import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
import { chatIdCookieName } from "src/backend/constants/caching"
import { ChatCompletionRequestMessage } from "openai"
import {
    convertResponseToRequestMessage,
    createChatCompletion,
    getChatData,
    storeChatData
} from "src/backend/services/chatgpt"

export default async function PUT(request: NextApiRequest, resp: NextApiResponse) {
    let messages: ChatCompletionRequestMessage[] = JSON.parse(request.body)
    const chatId = request.cookies[chatIdCookieName] || ''

    if (chatId) {
        const pastMessages = await getChatData(chatId)

        if (pastMessages) {
            messages = [...pastMessages, ...messages]
        }
    }

    const chatCompletion = await createChatCompletion(messages)

    if (chatCompletion && chatCompletion.status === 200) {
        resp.setHeader('Set-Cookie', serialize(chatIdCookieName, chatCompletion.data.id, {
            maxAge: 1200,
            path: '/'
        }))

        const newMessages = convertResponseToRequestMessage(chatCompletion.data.choices)
        const storeMessages = [...messages, ...newMessages]

        storeChatData(chatCompletion.data.id, storeMessages)

        resp.status(200).json(chatCompletion)
    } else {
        resp.status(500).json({ message: 'Something went wrong' })
    }
}