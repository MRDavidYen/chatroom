import { ChatCompletionResponseMessage, CreateCompletionResponseUsage } from "openai";

export interface IChatMessageAndToken {
    messageId: string
    message?: ChatCompletionResponseMessage
    tokenUsed?: CreateCompletionResponseUsage
}