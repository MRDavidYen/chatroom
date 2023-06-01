import { NextApiRequest, NextApiResponse } from 'next'
import { ChatMessage } from 'src/client/components/chatroom'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { getTuningFiles } from 'src/server/persistants/firestore/models'
import {
  convertEveryTwoChatMessageToFineTuningPair,
  createFineTuningFile,
} from 'src/server/services/chatgpt/tuning'

async function POST(req: NextApiRequest, response: NextApiResponse) {
  const payload = req.body as CreateFilePayload
  const pairs = convertEveryTwoChatMessageToFineTuningPair(payload.conversions)

  await createFineTuningFile(pairs, payload.fileName)

  return response.status(200).json({})
}

async function GET(req: NextApiRequest, response: NextApiResponse) {
  const tuningFiles = await getTuningFiles()

  return response.status(200).json(tuningFiles)
}

const handler: MultipleMethodHandler = {
  POST,
  GET
}

export type CreateFilePayload = {
  conversions: ChatMessage[]
  fileName: string
}

export default apiMiddleware(handler)
