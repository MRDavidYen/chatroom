import { Server as NetServer, Socket } from "net"
import { NextRequest } from "next/server"
import { Server as SocketIOServer } from "socket.io"

type SocketRequest = NextRequest & {
    socket: Socket
}

type SocketResponse = NextResponse & {
    socket: Socket & {
        server: any
    }
}

export {
    SocketRequest,
    SocketResponse
}