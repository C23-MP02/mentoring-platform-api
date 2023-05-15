import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
import multer from "multer";

import createError from "http-errors";

import routes from "./routes/index.routes";

const PORT = parseInt(process.env.PORT!) || 8080;

const app = express();

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multerMid.single("file"));

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Response Success" });
});

app.use(routes);

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});
app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running on port: ${PORT}`)
);
