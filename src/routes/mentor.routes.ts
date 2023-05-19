import { getAllMentors } from "../controllers/mentor.controller";
import { isAuth } from "../middlewares/firebase.auth";
import router from "./router";

// router.get("/", getMentor);
router.get("/all", getAllMentors);

export default router;
