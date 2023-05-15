import { Router } from "express";
import {
  getInterest,
  getProfile,
  updateDaysAvailability,
  updateInterests,
  updateProfile,
  updateRole,
  uploadAvatar,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getProfile);
router.get("/interest", getInterest);

router.post("/", updateProfile);
router.post("/interest", updateInterests);
router.post("/days", updateDaysAvailability);
router.post("/role", updateRole);
router.post("/avatar", uploadAvatar);

export default router;
