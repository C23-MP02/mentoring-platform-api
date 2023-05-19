import { isAuth } from "../middlewares/firebase.auth";
import router from "./router";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import mentorRoutes from "./mentor.routes";
import mentoringRoutes from "./mentoring.routes";

router.use("/auth", authRoutes);
router.use("/user", isAuth, userRoutes);
router.use("/mentoring", isAuth, mentoringRoutes);
router.use("/mentor", isAuth, mentorRoutes);

export default router;
