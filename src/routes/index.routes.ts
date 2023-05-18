import router from "./router";
import { isAuth } from "../middlewares/firebase.auth";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import mentoringRoutes from "./mentoring.routes";

router.use("/auth", authRoutes);
router.use("/user", isAuth, userRoutes);
router.use("/mentoring", isAuth, mentoringRoutes);

export default router;
