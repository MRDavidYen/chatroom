import { setCacheToMemory } from "../persistants/cache"

const storeSocketId = (socketId: string, userId: string) => {
    setCacheToMemory(userId, socketId)
}