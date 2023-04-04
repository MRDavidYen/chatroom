import { Socket } from "socket.io-client"
import { ContextProperties } from "."

type SocketContext = {
    socket?: Socket
}

type SocketContextProperties = ContextProperties

export {
    SocketContext,
    SocketContextProperties
}