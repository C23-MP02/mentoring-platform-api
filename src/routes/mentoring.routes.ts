import {
  createMentoring,
  createMentoringFeedback,
  getMentoringsSchedule,
} from "../controllers/mentoring.controller";
import { isMentee, isMentor } from "../middlewares/firebase.auth";
import router from "./router";

router.post("/create", isMentor, createMentoring);
router.post("/feedback", isMentee, createMentoringFeedback);
router.get("/schedule", getMentoringsSchedule);

export default router;
