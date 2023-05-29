import admin from 'firebase-admin/app'

const firebaseConfig = {
  credential: admin.cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECTID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
}

const firebaseAdminApp = admin.initializeApp(firebaseConfig)

export { firebaseAdminApp }
