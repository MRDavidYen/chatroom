import { NextApiRequest, NextApiResponse } from 'next'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'

async function POST(request: NextApiRequest, response: NextApiResponse) {
  return response.status(200).json({ message: 'auth' })
}

const handler: MultipleMethodHandler = {
  POST: POST,
}

export default apiMiddleware(handler)
