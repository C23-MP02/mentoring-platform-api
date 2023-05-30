import {
  getAllMentors,
  getMentorDashboard,
} from "../controllers/mentor.controller";
import { isMentee, isMentor } from "../middlewares/firebase.auth";
import router from "./router";

// router.get("/", getMentor);
router.get("/all", isMentee, getAllMentors);
router.get("/dashboard", isMentor, getMentorDashboard);

export default router;
