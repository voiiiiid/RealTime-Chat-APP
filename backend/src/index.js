import express from "express";
import dotenv from "dotenv";
import cookieParse from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParse());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("hi there");
});

server.listen(port, () => {
  console.log(`app is listening to port ${port}`);
  connectDB();
});
