"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const client_1 = require("@repo/db/client");
const wss = new ws_1.WebSocketServer({ port: 3002 });
console.log("WebSocket server running on ws://localhost:3002");
wss.on("connection", async (socket) => {
    console.log("Client connected");
    const response = await client_1.prisma.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString(),
        }
    });
    socket.send(`user login: ${JSON.stringify(response)}`);
    // Receive message from client
    socket.on("message", (data) => {
        console.log("Received:", data.toString());
        // Send message back to client
        socket.send(`Server received: ${data.toString()}`);
    });
    // Handle disconnect
    socket.on("close", () => {
        console.log("Client disconnected");
    });
    // Handle errors
    socket.on("error", (err) => {
        console.error("WebSocket error:", err);
    });
});
