import { ChatCompletionRequestMessage } from "openai"
import { useEffect, useRef, useState } from "react"
import { fetchSSE } from "src/client/endpoints"
import { ChatStreamingChunk } from "src/typing/chatgpt"
import MarkdownIt from "markdown-it"
import styles from "src/styles/markdown.module.scss"
import { fetchEventSource } from "@microsoft/fetch-event-source"

const StreamingChat = () => {
    const abortControllerRef = useRef<AbortController>(new AbortController())
    const messagesRef = useRef<string>("")
    const [responseMessage, setResponseMessage] = useState<string>("")


    const startStreaming = async (abort: AbortController) => {
        const md = new MarkdownIt()
        const requestMessage: ChatCompletionRequestMessage[] = [
            {
                role: "user",
                content: "Can you write a simple JS code for example? I want you to write a code that can be used to calculate the sum of two numbers."
            }
        ]

        const fetchCompletion = fetchEventSource('/api/streaming', {
            method: 'POST',
            body: JSON.stringify(requestMessage),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: abort.signal,
            onmessage: (event) => {
                const result = JSON.parse(event.data) as ChatStreamingChunk

                for (const choice of result.choices) {
                    if (choice.delta.content) {
                        messagesRef.current = messagesRef.current + choice.delta.content

                        setResponseMessage(md.render(messagesRef.current))
                    }
                }
            }
        })
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
            <div id={styles.markdown} className="border rounded-md border-[#000]">
                <div dangerouslySetInnerHTML={{ __html: responseMessage }}></div>
            </div>
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