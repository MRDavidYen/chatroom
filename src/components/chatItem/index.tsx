import { ChatCompletionResponseMessage, CreateCompletionResponseUsage } from "openai"
import React from "react"
import { calculateGptTokenPrice } from "src/libs/calculation"

const ChatItem = ({ ...props }: IChatItemProps) => {
    const userMessage = () => {
        return (
            <div className="chat-item flex justify-end my-4">
                <p
                    className="w-9/12 border border-green-100 bg-green-100 text-gray-800 rounded-lg p-2"
                >{props.message?.content}</p>
            </div>
        )
    }

    const systemMessage = () => {
        return (
            props.message?.role === "system" ?
                <div className="chat-item flex justify-start my-4">
                    <div className="w-9/12 border border-red-100 bg-red-100 text-gray-800 rounded-lg p-2">
                        <p>{props.message?.content}</p>
                    </div>
                </div>
                : <div className="chat-item flex justify-start my-4">
                    <div className="w-9/12 border border-blue-100 bg-blue-100 text-gray-800 rounded-lg p-2">
                        <p dangerouslySetInnerHTML={{ __html: (props.message?.content || "") }}></p>
                        <div className="border-t border-gray-600 pt-4 mt-4">
                            <p>提示使用Token量：{props.token?.prompt_tokens}</p>
                            <p>回應使用Token量：{props.token?.completion_tokens}</p>
                            <p>總共使用Token量：{props.token?.total_tokens}</p>
                        </div>
                        <div>
                            <p>估算價格（使用GPT4）：${calculateGptTokenPrice(props.token?.total_tokens)}</p>
                        </div>
                    </div>
                </div>
        )
    }

    return (
        props.message ?
            props.message.role === "user" ?
                userMessage()
                : systemMessage()
            : <></>
    )
}

export interface IChatItemProps {
    message?: ChatCompletionResponseMessage
    token?: CreateCompletionResponseUsage
}

const ChatItemMemo = React.memo(ChatItem)

export default ChatItemMemo