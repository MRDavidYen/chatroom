import { NextApiRequest, NextApiResponse } from 'next'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { createFineTuningFile } from 'src/server/services/chatgpt/tuning'
import { FineTuningPair } from 'src/typing/chatgpt'

async function POST(req: NextApiRequest, response: NextApiResponse) {
  const pairs: FineTuningPair[] = [
    {
      prompt: 'This is a test',
      completion: 'This is a test completion',
    },
    {
      prompt: 'This is a test 2',
      completion: 'This is a test completion 2',
    },
  ]

  await createFineTuningFile(pairs)

  return response.status(200).json({})
}

const handler: MultipleMethodHandler = {
  POST,
}

export default apiMiddleware(handler)
