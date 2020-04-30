import * as express from 'express';
import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

// process.env.FIREBASE_DATABASE_EMULATOR_HOST = 'localhost:9000';

const app = express();

const serviceAccount = require('../../credentials/serviceAccountKey.json');
admin.initializeApp({
  credential:
    // process.env.FUNCTIONS_EMULATOR === 'true'
    //   ? admin.credential.applicationDefault()
    //   : admin.credential.cert(serviceAccount),
    admin.credential.cert(serviceAccount),
  databaseURL:
    process.env.FUNCTIONS_EMULATOR === 'true'
      ? 'http://localhost:9000'
      : JSON.parse(
          process.env.FIREBASE_CONFIG ??
            '{ databaseURL: "https://fir-node-e770c.firebaseio.com/" }',
        ).databaseURL,
});
const db = admin.database();
// const ref = db.ref('users');
const ref = db.ref();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get('/hello', (request, response) => {
  // axios
  //   .get('http://localhost:9000/users.json')
  //   .then((res) => console.log({ ...res.data }));
  // console.log({ ref });

  ref.once(
    'value',
    (snapshot) => {
      response.send(`Hello from Firebase!`);
      console.log(snapshot.val());
    },
    (error) => {
      console.log(`The read failed: ${error.message}`);
    },
  );

  // response.send(`Hello from Firebase!`);
});

// app.get('/database', (_request, _response) => {
//   const ref = functions.database.ref('users');

//   ref.onCreate((snapshot, context) => {
//     console.log(snapshot.val());
//   });
// });

export const api = https.onRequest(app);
