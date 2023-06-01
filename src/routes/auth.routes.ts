import router from "./router";
import { providerLogin, register } from "../controllers/auth.controller";

router.post("/register", register);
router.post("/provider", providerLogin);

export default router;
