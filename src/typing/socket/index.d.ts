import { NextRequest } from "next/server"

type SocketRequest = NextRequest & {
    socket: Socket
}

type SocketResponse = Response & {
    socket: any
}

type Socket = {
    server: SocketServer
}

type SocketServer = {
    io: any
}

export {
    SocketRequest,
    SocketResponse
}