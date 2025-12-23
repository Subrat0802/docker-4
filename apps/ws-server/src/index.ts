import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const wss = new WebSocketServer({ port: 3002 });

console.log("WebSocket server running on ws://localhost:3002");

wss.on("connection", async (socket) => {
  console.log("Client connected");

  const response = await prisma.user.create({
        data:{
            username: Math.random().toString(),
            password: Math.random().toString(),
        }   
    })

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
