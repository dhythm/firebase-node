import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const serviceAccount = require('../../credentials/serviceAccountKey.json');

const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'http://localhost:9000',
});
const db = admin.database();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get('/hello', (_request, response) => {
  const ref = db.ref('users');
  // console.log({ ref });
  ref.once(
    'value',
    (snapshot) => {
      console.log(snapshot.val());
      response.send(`Get data from realtime database.`);
    },
    (error) => {
      console.log(`The read failed: ${error.message}`);
    },
  );

  // response.send(`Hello from Firebase!`);
});

export const api = functions.https.onRequest(app);
