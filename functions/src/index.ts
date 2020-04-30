import * as express from 'express';
import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

// process.env.FIREBASE_DATABASE_EMULATOR_HOST = 'localhost:9000';

const app = express();

const serviceAccount = require('../../credentials/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'http://localhost:9000'
// });
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://fir-node-e770c.firebaseio.com/',
  databaseURL: JSON.parse(
    process.env.FIREBASE_CONFIG ??
      '{ databaseURL: "https://fir-node-e770c.firebaseio.com/" }',
  ).databaseURL,
});
const db = admin.database();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get('/hello', (request, response) => {
  const ref = db.ref('users');

  ref.once(
    'value',
    (snapshot) => {
      response.write(`Hello from Firebase!`);
      response.write(`\n`);
      response.write(`${JSON.stringify(snapshot.val())}`);
      response.end();
      // response.send(`Hello from Firebase! ${JSON.stringify(snapshot.val())}`);
    },
    (error) => {
      console.log(`The read failed: ${error.message}`);
    },
  );
});

export const api = https.onRequest(app);
