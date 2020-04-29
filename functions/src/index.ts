import * as express from "express";
import * as functions from "firebase-functions";

const app = express();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

app.get("/hello", (_request, response) => {
  response.send(`Hello from Firebase!`);
});

export const api = functions.https.onRequest(app);
