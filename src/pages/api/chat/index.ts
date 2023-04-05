import { NextApiRequest, NextApiResponse } from "next"
import { serialize, parse } from "cookie"
import { chatIdCookieName } from "src/constants/caching"
import { ChatCompletionRequestMessage } from "openai"
import {
    convertResponseToRequestMessage,
    createChatCompletion,
    getChatData,
    storeChatDataIntoMemory
} from "src/server/services/chatgpt"
import { NextRequest, NextResponse } from "next/server"
import { deleteCookie, setCookie } from "src/server/persistants/cookies"
import { apiMiddleware, MultipleMethodHandler } from "src/server/libs/middleware"

async function PUT(request: NextApiRequest, response: NextApiResponse) {
    return response.status(500).json({ message: 'Could not create chat' })

    // let messages: ChatCompletionRequestMessage[] = request.body
    // const chatId = request.cookies[chatIdCookieName] || ''

    // if (chatId) {
    //     const pastMessages = await getChatData(chatId)

    //     if (pastMessages) {
    //         messages = [...pastMessages, ...messages]
    //     }
    // }

    // const chatCompletion = await createChatCompletion(messages)

    // if (chatCompletion && chatCompletion.status === 200) {
    //     setCookie(response, chatIdCookieName, chatCompletion.data.id)

    //     const newMessages = convertResponseToRequestMessage(chatCompletion.data.choices)
    //     const storeMessages = [...messages, ...newMessages]

    //     storeChatDataIntoMemory(chatCompletion.data.id, storeMessages)

    //     return response.status(200).json(chatCompletion.data)
    // }

    // return response.status(500).json({ message: 'Could not create chat' })

}

async function DELETE(req: NextApiRequest, resp: NextApiResponse) {
    const chatId = req.cookies[chatIdCookieName] || ''

    if (chatId) {
        deleteCookie(resp, chatIdCookieName)

        return resp.status(200).json({ message: 'Deleted chat' })
    }

    return resp.status(500).json({ message: 'Could not delete chat' })
}

const handler: MultipleMethodHandler = {
    "PUT": PUT,
    "DELETE": DELETE
}

export default apiMiddleware(handler)