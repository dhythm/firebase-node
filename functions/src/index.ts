import * as express from "express";
// import { database } from "firebase-admin";
import * as functions from "firebase-functions";

const app = express();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get("/hello", (_request, response) => {
  // const db = database();
  // const ref = db.ref("users");

  response.send(`Hello from Firebase!`);
});

export const api = functions.https.onRequest(app);
