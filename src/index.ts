import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";

import { PrismaClient } from "@prisma/client";
import createError from "http-errors";

import authRoutes from "./routes/auth.route";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// TODO: Routing aplikasi akan kita tulis di sini
app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});
app.use("/auth", authRoutes);

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
);
