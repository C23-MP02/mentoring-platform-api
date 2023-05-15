import router from "./router";
import { isAuth } from "../middlewares/firebase.auth";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

router.use("/auth", authRoutes);
router.use("/user", isAuth, userRoutes);

export default router;
