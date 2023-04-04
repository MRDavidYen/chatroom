import { ChatCompletionResponseMessage } from "openai"
import { fetchWithBody } from "."

const startChatStreamingApi = async (message: ChatCompletionResponseMessage[]) => {
    const eventSource = new EventSource("/api/chat/streaming", {
        
    })
}