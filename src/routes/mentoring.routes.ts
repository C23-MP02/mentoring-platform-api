import {
  createMentoring,
  createMentoringFeedback,
} from "../controllers/mentoring.controller";
import { isMentee, isMentor } from "../middlewares/firebase.auth";
import router from "./router";

router.post("/create", isMentor, createMentoring);
router.post("/feedback", isMentee, createMentoringFeedback);

export default router;
