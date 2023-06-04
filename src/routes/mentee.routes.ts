import {
  getAllMentors,
} from "../controllers/mentee.controller";
import { createMentoringFeedback, getMentoringsSchedule } from "../controllers/mentoring.controller";
import router from "./router";

router.get("/mentors", getAllMentors);
router.get("/schedule", getMentoringsSchedule);
router.post("/feedback", createMentoringFeedback);

export default router;
