import { NextApiRequest, NextApiResponse } from 'next'
import {
  apiMiddleware,
  MultipleMethodHandler,
} from 'src/server/libs/middleware'
import { firebaseAdminApp } from 'src/server/services/firebase'
import { getAuth } from 'firebase-admin/auth'
import { CreateMemberRequest } from 'src/typing/api/auth'

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const payload: CreateMemberRequest = request.body

  const userRecord = getAuth(firebaseAdminApp).createUser({
    email: payload.email,
    password: payload.password,
    displayName: payload.name,
  })

  response.status(200).json(userRecord)
  return
}

const handler: MultipleMethodHandler = {
  POST,
}

export default apiMiddleware(handler)
