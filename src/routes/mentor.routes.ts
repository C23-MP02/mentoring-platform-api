import { getAllMentors } from "../controllers/mentor.controller";
import router from "./router";

// router.get("/", getMentor);
router.get("/all", getAllMentors);

export default router;
