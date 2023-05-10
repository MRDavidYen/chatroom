import { NextApiRequest, NextApiResponse } from "next"

type NextApiHandler = (req: NextApiRequest, res: CustomNextApiResponse) => Promise<void | NextApiResponse>

type CustomNextApiResponse = NextApiResponse & {
    flush: () => void
}

type MultipleMethodHandler = { [key: string]: NextApiHandler }

const apiMiddleware = (handler: MultipleMethodHandler) => {
    return async (req: NextApiRequest, res: CustomNextApiResponse) => {
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
    MultipleMethodHandler
}
