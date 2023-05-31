import axios from "axios";
import FormData from "form-data";
import { ChatCompletionRequestMessage, CreateChatCompletionResponseChoicesInner, CreateTranscriptionResponse } from "openai";
import { openaiHost, openaiKey } from "src/constants/chatgpt";
import { openaiService } from "src/server/utilities/chatgpt";
import { getCacheFromMemory, setCacheToMemory } from "../../persistants/cache";

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

const createWhisperTranscription = async (formData: FormData) => {
    formData.append('model', 'whisper-1')

    return await axios.post<CreateTranscriptionResponse>(openaiHost + "audio/transcriptions", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${openaiKey}`
        }
    })
}

const storeChatDataIntoMemory = (chatId: string, newMessages: ChatCompletionRequestMessage[]) => {
    const pastMessages = getChatData(chatId)
    let messages = newMessages

    if (pastMessages) {
        messages = [...pastMessages, ...newMessages]
    }

    setCacheToMemory(chatId, newMessages)
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
    createWhisperTranscription,
    storeChatDataIntoMemory,
    getChatData,
    convertResponseToRequestMessage
}