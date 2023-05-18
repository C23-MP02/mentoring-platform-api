import { createMentoring } from "../controllers/mentoring.controller";
import { isMentor } from "../middlewares/firebase.auth";
import router from "./router";

router.post("/create", isMentor, createMentoring);

export default router;
