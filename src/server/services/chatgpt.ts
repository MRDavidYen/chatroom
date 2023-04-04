import { ChatCompletionRequestMessage, CreateChatCompletionResponseChoicesInner } from "openai";
import { openaiService } from "src/server/utilities/chatgpt";
import { getCacheFromMemory, setCacheToMemory } from "../persistants/cache";

const createChatCompletion = async (messages: ChatCompletionRequestMessage[]) => {
    return await openaiService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages
    }, {
        timeout: 40000,
        timeoutErrorMessage: 'Request timed out'
    })
}

const createChatCompletionStreaming = async (messages: ChatCompletionRequestMessage[]): Promise<any> => {
    return await openaiService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true
    }, {
        responseType: "stream"
    })
}

const storeChatData = (chatId: string, messages: ChatCompletionRequestMessage[]) => {
    setCacheToMemory(chatId, messages)
}

const getChatData = (chatId: string) => {
    return getCacheFromMemory<ChatCompletionRequestMessage[]>(chatId)
}

const convertResponseToRequestMessage = (respMessages: CreateChatCompletionResponseChoicesInner[]) => {
    return respMessages.map((respMessage) => {
        return {
            role: respMessage.message?.role,
            content: respMessage.message?.content
        } as ChatCompletionRequestMessage
    })
}

export {
    createChatCompletion,
    createChatCompletionStreaming,
    storeChatData,
    getChatData,
    convertResponseToRequestMessage
}