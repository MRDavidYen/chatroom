import { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage } from "openai";
import { chatIdCookieName } from "src/constants/caching";
import { apiMiddleware, MultipleMethodHandler } from "src/server/libs/middleware";
import { storeChatDataIntoMemory } from "src/server/services/chatgpt";

async function POST(request: NextApiRequest, response: NextApiResponse) {
    const message: ChatCompletionRequestMessage[] = request.body
    const chatId = request.cookies[chatIdCookieName] || ''

    if (chatId) {
        storeChatDataIntoMemory(chatId, message)

        return response.status(200).json({ message: 'chat stored' })
    }

    return response.status(500).json({ message: 'chatid not found' })
}

const handler: MultipleMethodHandler = {
    "POST": POST
}

export default apiMiddleware(handler)