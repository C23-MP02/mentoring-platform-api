import { isAuth, isMentee, isMentor } from "../middlewares/firebase.auth";
import router from "./router";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import mentorRoutes from "./mentor.routes";
import menteeRoutes from "./mentee.routes";

router.use("/auth", authRoutes);
router.use("/user", isAuth, userRoutes);
router.use("/mentor", isAuth, isMentor, mentorRoutes);
router.use("/mentee", isAuth, isMentee, menteeRoutes);

export default router;
