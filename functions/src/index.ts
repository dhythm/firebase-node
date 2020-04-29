import * as express from "express";
// import { admin, database } from "firebase-admin";
import * as functions from "firebase-functions";

const app = express();
// admin.initializeApp();
// const db = database();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get("/hello", (_request, response) => {
  // const ref = db.ref("users");

  response.send(`Hello from Firebase!`);
});

export const api = functions.https.onRequest(app);
