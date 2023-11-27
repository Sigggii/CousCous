import fastify, { FastifyRequest, onRequestHookHandler } from "fastify";
import cors from "@fastify/cors";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import applicationDefault = credential.applicationDefault;
import { FreeHugBody } from "./common/models";

import dotenv from "dotenv";
dotenv.config();

initializeApp({
  credential: applicationDefault(),
  projectId: "couscous-c9fe7",
});

const server = fastify();

const checkHeaderMiddleware: onRequestHookHandler = (req, reply, done) => {
  const expectedHeaderValue = process.env.SECRET;

  // Replace 'your_header_name' with the actual header name you want to check
  const actualHeaderValue = req.headers["authorization"];

  if (actualHeaderValue === expectedHeaderValue) {
    // The expected value is present in the header
    done();
  } else {
    // The expected value is not present, respond with an error
    reply.code(401).send("Not Authorized");
  }
};

// Register the middleware for every route
server.addHook("onRequest", checkHeaderMiddleware);

var splashScreenMessage = "Ich <3 dich mein Schatz !!!";

server.get("/message", async (request, reply) => {
  return splashScreenMessage;
});

server.post(
  "/message",
  async (request: FastifyRequest<{ Body: { message: string } }>) => {
    splashScreenMessage = request.body.message;
  },
);

server.post(
  "/give-hug",
  async (request: FastifyRequest<{ Body: FreeHugBody }>) => {
    const { sender, message } = request.body;
    getMessaging()
      .send({
        notification: {
          title: `${sender} will dich umarmen 🫂`,
          body: message,
        },
        topic: sender.freeHugTopicSend,
        android: {
          notification: {
            sound: "default",
            defaultVibrateTimings: false,
            vibrateTimingsMillis: [500, 250, 250, 250, 250, 250],
          },
        },
      })
      .then((result) => {});
  },
);

server.listen(
  { port: (process.env.PORT as number | undefined) || 8080, host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  },
);
