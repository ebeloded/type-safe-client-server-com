import * as functions from 'firebase-functions'
import expressApi from './api/express.api'
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const request = functions.https.onRequest(expressApi)
