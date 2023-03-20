import { ChatCompletionResponseMessage, CreateChatCompletionResponse } from "openai";
import { fetchWithBody } from ".";

const sendChatMessageApi = async (message: ChatCompletionResponseMessage[]): Promise<CreateChatCompletionResponse> => {
    const resp = await fetchWithBody("/api/chat", message, "PUT")

    if (resp.status === 200) {
        return resp.json()
    }

    return Promise.reject(resp)
}

const deleteChatApi = async (): Promise<void> => {
    const resp = await fetch("/api/chat", {
        method: "DELETE"
    })

    if (resp.status !== 200) {
        return Promise.reject(resp)
    }
}

export {
    sendChatMessageApi,
    deleteChatApi
}