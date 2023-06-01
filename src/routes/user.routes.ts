import router from "./router";
import {
  getAvailability,
  getInterest,
  getProfile,
  updateDaysAvailability,
  updateInterests,
  updateProfile,
  // updateRole,
  uploadAvatar,
} from "../controllers/user.controller";

router.get("/", getProfile);
router.get("/interest", getInterest);
router.get("/days", getAvailability);

router.put("/", updateProfile);
router.put("/interest", updateInterests);
router.put("/days", updateDaysAvailability);
router.put("/avatar", uploadAvatar);

// TODO: Update Role
// router.put("/role", updateRole);

export default router;
