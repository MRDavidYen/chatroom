import { Server } from 'socket.io'
import { SocketRequest, SocketResponse } from 'src/typing/socket'

export function GET(req: SocketRequest, resp: SocketResponse) {
    if (req.socket.server.io) {
        return new Response(JSON.stringify({ message: 'Socket.io is already running' }), {
            status: 200
        })
    }

    const io = new Server(resp.socket.server)

    io.on('connection', (socket) => {
        socket.id
        socket.on('message', (message) => {
            socket.emit('message', message)
        })
    })

    resp.socket.server.io = io

    return new Response(JSON.stringify({ message: 'Socket.io is running' }))
}