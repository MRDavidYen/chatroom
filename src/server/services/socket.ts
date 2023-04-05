import { setCacheToMemory } from "../persistants/cache"
import { v4 as uuid } from 'uuid'

const storeSocketId = (socketId: string) => {
    const userId = uuid()
    setCacheToMemory(userId, socketId)
}

const socketServerEvents = {
    
}

export {
    storeSocketId
}