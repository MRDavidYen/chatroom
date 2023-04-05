import { ChatCompletionRequestMessage, ChatCompletionResponseMessage, CreateChatCompletionResponse } from "openai";
import { fetchWithBody } from ".";

const sendChatMessageApi = async (message: ChatCompletionResponseMessage[]): Promise<CreateChatCompletionResponse> => {
    const resp = await fetchWithBody("/api/chat", message, {
        method: "PUT"
    })

    if (resp.status === 200) {
        return resp.json()
    }

    throw new Error(await resp.json())
}

const deleteChatApi = async (): Promise<void> => {
    await fetch("/api/chat", {
        method: "DELETE"
    })
}

const saveChatApi = async (message: ChatCompletionRequestMessage[]): Promise<void> => {
    await fetchWithBody("/api/chat/save", message, {
        method: "POST"
    })
}

export {
    sendChatMessageApi,
    deleteChatApi,
    saveChatApi
}