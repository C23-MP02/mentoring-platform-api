import router from "./router";
import { providerLogin, register } from "../controllers/auth.controller";
import { isFirebaseAuth } from "../middlewares/firebase.auth";

router.post("/register", register);
router.post("/provider", providerLogin);
router.post("/login", isFirebaseAuth);

export default router;
