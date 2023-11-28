"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = require("firebase-admin");
const messaging_1 = require("firebase-admin/messaging");
var applicationDefault = firebase_admin_1.credential.applicationDefault;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, app_1.initializeApp)({
    credential: applicationDefault(),
    projectId: "couscous-c9fe7",
});
const server = (0, fastify_1.default)();
const checkHeaderMiddleware = (req, reply, done) => {
    const expectedHeaderValue = process.env.SECRET;
    // Replace 'your_header_name' with the actual header name you want to check
    const actualHeaderValue = req.headers["authorization"];
    if (actualHeaderValue === expectedHeaderValue) {
        // The expected value is present in the header
        done();
    }
    else {
        // The expected value is not present, respond with an error
        reply.code(401).send("Not Authorized ABC");
    }
};
// Register the middleware for every route
//server.addHook("onRequest", checkHeaderMiddleware);
var splashScreenMessage = "Ich <3 dich mein Schatz !!!";
server.get("/message", async (request, reply) => {
    return splashScreenMessage;
});
server.post("/message", async (request) => {
    splashScreenMessage = request.body.message;
});
server.post("/give-hug", async (request) => {
    const { sender, message } = request.body;
    (0, messaging_1.getMessaging)()
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
        .then((result) => { });
});
server.listen({ port: process.env.PORT || 8080, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
