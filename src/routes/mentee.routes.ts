import {
  getAllMentors,
  getMentoringsSchedule,
} from "../controllers/mentee.controller";
import { createMentoringFeedback } from "../controllers/mentoring.controller";
import router from "./router";

router.get("/mentors", getAllMentors);
router.get("/schedule", getMentoringsSchedule);
router.post("/feedback", createMentoringFeedback);

export default router;
