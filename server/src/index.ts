import fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { initializeApp } from "firebase-admin/app";
import { credential } from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import applicationDefault = credential.applicationDefault;
import { FreeHugBody } from "./common/models";

const dotenv = require("dotenv");
dotenv.config();

initializeApp({
  credential: applicationDefault(),
  projectId: "couscous-c9fe7",
});

const server = fastify();
server.register(cors, { origin: "*", methods: ["GET"] });

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
      .then((result) => {
        console.log(request.body);
      });
  },
);

server.listen({ port: 8080, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
