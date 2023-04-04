import { NextApiRequest, NextApiResponse } from "next"

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void | NextApiResponse>

type MultipleMethodHandler = { [key: string]: NextApiHandler }

const apiMiddleware = (handler: MultipleMethodHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
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
    MultipleMethodHandler
}
