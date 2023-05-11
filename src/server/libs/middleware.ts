import { NextApiRequest, NextApiResponse } from "next"

type NextApiHandler = (req: CustomNextApiRequest, res: CustomNextApiResponse) => Promise<void | NextApiResponse>

type CustomNextApiResponse = NextApiResponse & {
    flush: () => void
}

type CustomNextApiRequest = NextApiRequest & {
    file: any
}

type MultipleMethodHandler = { [key: string]: NextApiHandler }

const apiMiddleware = (handler: MultipleMethodHandler) => {
    return async (req: CustomNextApiRequest, res: CustomNextApiResponse) => {
        const method = handler[req.method!]

        if (method) {
            return await method(req, res)
        }

        return res.status(405).json({ message: "Method Not Allowed" })
    }
}

export {
    apiMiddleware
}

export type {
    NextApiHandler,
    CustomNextApiResponse,
    CustomNextApiRequest,
    MultipleMethodHandler
}
