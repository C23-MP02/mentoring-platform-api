import router from "./router";
import {
  loginCallback,
  providerLogin,
  register,
} from "../controllers/auth.controller";
import { isAuth } from "../middlewares/firebase.auth";

router.post("/register", register);
router.post("/provider", providerLogin);
router.post("/login", isAuth, loginCallback);

export default router;
