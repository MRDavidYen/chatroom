import firebase from 'firebase-admin'

const serviceAccount = require('../../../firebase.json')

let app: firebase.app.App

if (firebase.apps.length === 0) {
  app = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  })
} else {
  app = firebase.app()
}

export const firebaseAdminApp = app
