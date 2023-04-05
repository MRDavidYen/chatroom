import { ChatCompletionResponseMessage, CreateCompletionResponseUsage, CreateChatCompletionResponseChoicesInner } from "openai";

interface IChatMessageAndToken {
    messageId: string
    message?: ChatCompletionResponseMessage
    tokenUsed?: CreateCompletionResponseUsage
}

type ChatStreamingCompletionResponse = {
    id: string
    object: string
    created: number
    model: string
    choices: Array<CreateChatCompletionResponseChoicesInner>
    usage: CreateCompletionResponseUsage
    on: (event: string, callback: (data: string) => void) => void
}

type ChatStreamingChunkDelta = {
    delta: {
        content?: string
        role?: string
    }
    index: number
    finish_reason?: string
}

type ChatStreamingChunk = {
    id: string
    object: string
    created: number
    model: string
    choices: ChatStreamingChunkDelta[]
}

export {
    IChatMessageAndToken,
    ChatStreamingCompletionResponse,
    ChatStreamingChunkDelta,
    ChatStreamingChunk
}
