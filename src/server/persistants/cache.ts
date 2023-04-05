import LRUCache from "lru-cache";

const lruCache = new LRUCache({
    max: 100,
    ttl: 1000 * 60 * 60
})

const getCacheFromMemory = <T>(key: string) => {
    return lruCache.get(key) as T | undefined
}

const setCacheToMemory = <T extends {}>(key: string, value: T) => {
    lruCache.set(key, value)
}

export {
    getCacheFromMemory,
    setCacheToMemory
}