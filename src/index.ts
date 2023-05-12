import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
import multer from "multer";

import createError from "http-errors";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { isAuth } from "./middlewares/firebase.auth";

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
  res.json({ message: "Hello World!" });
});

app.use("/auth", authRoutes);
// app.use("/user", isAuth, userRoutes);
app.use("/user", userRoutes);

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
);

// app.use((req: Request, res: Response, next: Function) => {
//   next(createError(404));
// });
