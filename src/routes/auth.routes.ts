import router from "./router";
import { register } from "../controllers/auth.controller";

router.post("/register", register);

export default router;
