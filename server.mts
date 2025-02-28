import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";

const hostname = process.env.HOSTNAME || "localhost";

const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);

  //   const io = new Server(server, {
  //     cors: {
  //       origin: "*",
  //       methods: ["GET", "POST"],
  //     },
  //   });
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("join-room", (roomId, username) => {
      socket.join(roomId);
      console.log(`user ${username} joined room ${roomId}`);
      socket.to(roomId).emit("user joined", `${username} has joined the room`);
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected ${socket.id}`);
    });

    socket.on("message", ({ room, message, sender }) => {
      console.log(`user ${sender} sent message ${message} to room ${room}`);
      socket.to(room).emit("message", { sender, message });
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
