import LRUCache from "lru-cache";
import { ChatCompletionRequestMessage, CreateChatCompletionResponseChoicesInner } from "openai";
import { openaiService } from "src/server/network/chatgpt";

const lruCache = new LRUCache({
    max: 100,
    ttl: 1000 * 60 * 60
})

const createChatCompletion = async (messages: ChatCompletionRequestMessage[]) => {
    return await openaiService.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages
    }, {
        timeout: 40000,
        timeoutErrorMessage: 'Request timed out'
    })
}

const storeChatData = (chatId: string, messages: ChatCompletionRequestMessage[]) => {
    lruCache.set(chatId, messages)
}

const getChatData = (chatId: string) => {
    return lruCache.get(chatId) as ChatCompletionRequestMessage[] | undefined
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
    storeChatData,
    getChatData,
    convertResponseToRequestMessage
}