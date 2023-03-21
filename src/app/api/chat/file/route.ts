import { NextRequest } from "next/server";
import { ChatCompletionResponseMessage } from "openai";

export async function POST(req: NextRequest) {
    try {
        const body: ChatCompletionResponseMessage[] = await req.json();

        
    } catch (e) {
        return new Response(JSON.stringify({ message: "Bad Request", ex: e }), {
            status: 400
        })
    }
}