import { firestoreCollections } from 'src/constants/firebase'
import { firebaseAdminApp } from 'src/server/services/firebase'
import { CreateFileResponse } from 'src/typing/chatgpt'

const saveTuningFile = async (tuning: CreateFileResponse) => {
  const database = firebaseAdminApp.firestore()
  const collection = database.collection(firestoreCollections.OPENAI_FILES)

  await collection.add(tuning)
}

const getTuningFiles = async () => {
  const database = firebaseAdminApp.firestore()
  const collection = database.collection(firestoreCollections.OPENAI_FILES)

  const snapshot = await collection.get()

  return snapshot.docs.map((doc) => doc.data() as TuningFileDocument)
}

export type TuningFileDocument = CreateFileResponse

export { saveTuningFile, getTuningFiles }
