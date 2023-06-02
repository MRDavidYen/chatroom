import { NextApiRequest, NextApiResponse } from 'next'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { firebaseAdminApp } from 'src/server/services/firebase'
import { ChatModelDocument } from 'src/typing/firestore/models'
import { firestoreCollections } from 'src/constants/firebase'
import {
  saveFuneTineModel,
  TuningFileDocument,
} from 'src/server/persistants/firestore/models'
import {
  createFineTuning,
  getFineTunedModelList,
} from 'src/server/services/chatgpt/tuning'

async function POST(req: NextApiRequest, response: NextApiResponse) {
  try {
    const payload = req.body as TuningFileDocument

    const tuningResponse = await createFineTuning(payload)

    await saveFuneTineModel(tuningResponse.data)
  } catch (e) {
    response.status(500).json({ message: 'Could not create chat' })
  }

  response.status(200).end()
  return
}

async function GET(request: NextApiRequest, response: NextApiResponse) {
  const modelList = await getFineTunedModelList()

  return response.status(200).json(modelList.data)
}

const handler: MultipleMethodHandler = {
  POST,
  GET,
}

export default apiMiddleware(handler)
