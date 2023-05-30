import { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionResponseMessage } from 'openai'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'

import db from 'firebase-admin/firestore'
import { firebaseAdminApp } from 'src/server/services/firebase'

async function POST(req: NextApiRequest, response: NextApiResponse) {
  try {
    const body: ChatCompletionResponseMessage[] = req.body
  } catch (e) {
    response.status(500).json({ message: 'Could not create chat' })
  }
}

async function GET(request: NextApiRequest, response: NextApiResponse) {
    const database = db.getFirestore(firebaseAdminApp)

    database.collection('chat_models')
}

const handler: MultipleMethodHandler = {
  POST,
  GET
}

export default apiMiddleware(handler)
