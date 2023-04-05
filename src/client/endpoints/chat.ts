import { ApiEndpointProps } from "src/typing/utilities/api";

const chatApis: ChatApis = {
    sendChatMessageApi: {
        method: "PUT",
        path: "/api/chat"
    },
    deleteChatApi: {
        method: "DELETE",
        path: "/api/chat"
    },
    saveChatApi: {
        method: "POST",
        path: "/api/chat/save"
    }
} as const

type ChatApisKeys =
    "sendChatMessageApi"
    | "deleteChatApi"
    | "saveChatApi"

type ChatApis = Record<ChatApisKeys, ApiEndpointProps>

export {
    chatApis
}