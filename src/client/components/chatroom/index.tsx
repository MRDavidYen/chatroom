import { useEffect, useRef, useState } from "react"
import { IChatMessageAndToken } from "src/typing/chatgpt"
import ChatItemMemo from "./chatItem"
import LoadingAnimation from "../loading"

const ChatRoom = ({ ...props }: IChatRoomProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()

        if (props.messages && props.messages.length > 0) {
            const lastMessage = props.messages[props.messages.length - 1]

            if (lastMessage.message && lastMessage.message.role === "user") {
                setLoading(true)
            } else {
                setLoading(false)
            }
        }
    }, [props.messages])

    return (
        <div
            ref={containerRef}
            className="p-10 my-4 border border-gray-600 rounded-md max-h-[80vh] overflow-y-auto"
        >
            {
                props.messages && props.messages.length > 0 ?
                    props.messages.map((item, index) => {
                        return (
                            <ChatItemMemo
                                message={item.message}
                                token={item.tokenUsed}
                                key={item.messageId}
                            />
                        )
                    })
                    :
                    <div
                        className="text-center text-2xl font-bold"
                    >
                        <h2>Submit message to start conversation.</h2>
                    </div>
            }
            <LoadingAnimation
                isShow={loading}
            />
        </div>
    )
}

export interface IChatRoomProps {
    messages: IChatMessageAndToken[]
}

export default ChatRoom