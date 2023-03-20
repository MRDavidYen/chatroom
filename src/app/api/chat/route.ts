import { NextApiRequest, NextApiResponse } from "next"
import { serialize, parse } from "cookie"
import { chatIdCookieName } from "src/backend/constants/caching"
import { ChatCompletionRequestMessage } from "openai"
import {
    convertResponseToRequestMessage,
    createChatCompletion,
    getChatData,
    storeChatData
} from "src/backend/services/chatgpt"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
    let messages: ChatCompletionRequestMessage[] = await request.json()
    const chatId = request.cookies.get(chatIdCookieName)?.value || ''

    if (chatId) {
        const pastMessages = await getChatData(chatId)

        if (pastMessages) {
            messages = [...pastMessages, ...messages]
        }
    }

    const chatCompletion = await createChatCompletion(messages)

    if (chatCompletion && chatCompletion.status === 200) {
        const resp = new Response(JSON.stringify(chatCompletion.data), {
            status: 200,
            headers: {
                'Set-Cookie': serialize(chatIdCookieName, chatCompletion.data.id, {
                    maxAge: 1200,
                    path: '/'
                })
            }
        })

        const newMessages = convertResponseToRequestMessage(chatCompletion.data.choices)
        const storeMessages = [...messages, ...newMessages]

        storeChatData(chatCompletion.data.id, storeMessages)

        return resp
    } else {
        return new Response(JSON.stringify({ message: 'Something went wrong' }), {
            status: 500
        })
    }
}

export async function DELETE(req: NextRequest) {
    const chatId = req.cookies.get(chatIdCookieName)?.value || ''

    if (chatId) {
        const resp = new Response(JSON.stringify({ message: 'Chat deleted' }), {
            status: 200,
            headers: {
                'Set-Cookie': serialize(chatIdCookieName, '', {
                    maxAge: -1,
                    path: '/'
                })
            }
        })

        return resp
    }

    return new Response(JSON.stringify({ message: 'Chat not found' }), {
        status: 404
    })
}