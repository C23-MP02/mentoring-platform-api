import {
  getMentorDashboard,
 
} from "../controllers/mentor.controller";
import {
  createMentoring,
  getMentoringsSchedule,
  updateMentoring,
} from "../controllers/mentoring.controller";
import router from "./router";

router.get("/dashboard", getMentorDashboard);
router.get("/schedule", getMentoringsSchedule);

router.post("/mentoring", createMentoring);
router.put("/mentoring", updateMentoring);

export default router;
