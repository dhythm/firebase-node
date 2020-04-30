import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const app = express();

// const dev = process.env.NODE_ENV !== 'production';
const serviceAccount = require('../../credentials/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FUNCTIONS_EMULATOR === 'true'
      ? 'http://localhost:9000'
      : JSON.parse(
          process.env.FIREBASE_CONFIG ??
            '{ databaseURL: "https://fir-node-e770c.firebaseio.com/" }',
        ).databaseURL,
});
const db = admin.database();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get('/hello', (_request, response) => {
  const ref = db.ref('users');
  console.log({ PROCESS_ENV: process.env });
  console.log({ ref });

  ref.once(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
    },
    (error) => {
      console.log(`The read failed: ${error.message}`);
    },
  );

  response.send(`Hello from Firebase!`);
});

app.get('/database', (_request, _response) => {
  const ref = functions.database.ref('users');

  ref.onCreate((snapshot, context) => {
    console.log(snapshot.val());
  });
});

export const api = functions.https.onRequest(app);
