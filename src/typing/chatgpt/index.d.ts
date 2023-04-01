import { ChatCompletionResponseMessage, CreateCompletionResponseUsage } from "openai";

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

export {
    IChatMessageAndToken,
    ChatStreamingCompletionResponse
}
