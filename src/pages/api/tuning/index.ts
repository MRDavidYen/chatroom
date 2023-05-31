import { NextApiRequest, NextApiResponse } from 'next'
import { ChatCompletionResponseMessage } from 'openai'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import * as firebase from 'firebase-admin'
import { firebaseAdminApp } from 'src/server/services/firebase'
import { ChatModelDocument } from 'src/typing/firestore/models'
import { randomUUID } from 'crypto'
import { firestoreCollections } from 'src/constants/firebase'

async function POST(req: NextApiRequest, response: NextApiResponse) {
  try {
    const storageData: ChatModelDocument = {
      id: randomUUID(),
      createDate: firebase.firestore.Timestamp.now(),
      tuningBy: [
        {
          id: randomUUID(),
          message: 'Hello',
          role: 'user',
        },
      ],
    }

    const database = firebaseAdminApp.firestore()

    database.collection(firestoreCollections.CHAT_MODELS).add(storageData)
  } catch (e) {
    response.status(500).json({ message: 'Could not create chat' })
  }

  response.status(200).end()
  return
}

async function GET(request: NextApiRequest, response: NextApiResponse) {
  const database = firebaseAdminApp.firestore()

  const query = await database
    .collection(firestoreCollections.CHAT_MODELS)
    .get()

  if (query.docs.length > 0) {
    const documentData: ChatModelDocument[] = []

    query.docs.forEach((doc) => {
      documentData.push(doc.data() as ChatModelDocument)
    })

    return response.status(200).json(documentData)
  }

  return response.status(200).json({})
}

const handler: MultipleMethodHandler = {
  POST,
  GET,
}

export default apiMiddleware(handler)
