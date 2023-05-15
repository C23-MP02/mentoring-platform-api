import router from "./router";
import {
  getAvailability,
  getInterest,
  getProfile,
  updateDaysAvailability,
  updateInterests,
  updateProfile,
  updateRole,
  uploadAvatar,
} from "../controllers/user.controller";

router.get("/", getProfile);
router.get("/interest", getInterest);
router.get("/days", getAvailability);

router.post("/", updateProfile);
router.post("/interest", updateInterests);
router.post("/days", updateDaysAvailability);
router.post("/role", updateRole);
router.post("/avatar", uploadAvatar);

export default router;
