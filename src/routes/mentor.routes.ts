import {
  getMentorDashboard,
  getMentoringsSchedule,
} from "../controllers/mentor.controller";
import { createMentoring } from "../controllers/mentoring.controller";
import router from "./router";

router.get("/dashboard", getMentorDashboard);
router.post("/mentoring", createMentoring);
router.get("/schedule", getMentoringsSchedule);

export default router;
