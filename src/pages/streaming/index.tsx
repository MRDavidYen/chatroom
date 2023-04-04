import { ChatCompletionRequestMessage } from "openai"
import { useEffect, useRef } from "react"
import { fetchSSE } from "src/endpoints"

const StreamingChat = () => {
    const abortControllerRef = useRef<AbortController>(new AbortController())

    const startStreaming = async (abort: AbortController) => {
        const requestMessage: ChatCompletionRequestMessage[] = [
            {
                role: "user",
                content: "Hello, I am David."
            }
        ]

        const generator = await fetchSSE("/api/streaming", requestMessage, abort)

        for await (const message of generator) {
            console.log(message)
        }
    }

    const onSend = () => {
        startStreaming(abortControllerRef.current!)
    }

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort()
        }
    }, [])

    return (
        <div>
            <button
                className="bg-green-600"
                onClick={onSend}
            >
                送出
            </button>
        </div>
    )
}

export default StreamingChat