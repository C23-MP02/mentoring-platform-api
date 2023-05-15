import { Router } from "express";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { isAuth } from "./middlewares/firebase.auth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", isAuth, userRoutes);

export default router;
