import { NextApiRequest, NextApiResponse } from "next"
import { ChatCompletionResponseMessage } from "openai"

export async function POST(req: NextApiRequest, response: NextApiResponse) {
    try {
        const body: ChatCompletionResponseMessage[] = req.body


    } catch (e) {
        response.status(500).json({ message: 'Could not create chat' })
    }
}