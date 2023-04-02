import { Configuration, OpenAIApi } from "openai"
import { openaiKey } from "src/constants/chatgpt"

const configuration = new Configuration({
    apiKey: openaiKey
})

export const openaiService = new OpenAIApi(configuration)