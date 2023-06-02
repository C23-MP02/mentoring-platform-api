import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
import { multerMid } from "./utils/multerConfig";

import createError from "http-errors";

import routes from "./routes/index.routes";

const PORT = parseInt(process.env.PORT!) || 8080;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multerMid.single("file"));

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Dicoding Mentoring Platform API",
    author: "Cloud Computing C23-MP02",
  });
});

app.use(routes);

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});
app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running on port: ${PORT}`)
);
