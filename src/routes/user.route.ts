import { Router } from "express";
import {
  getInterest,
  getProfile,
  updateInterest,
  updateProfile,
  updateRole,
  uploadAvatar,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getProfile);
router.get("/interest", getInterest);

router.post("/", updateProfile);
router.post("/interest", updateInterest);
router.post("/role", updateRole);
router.post("/avatar", uploadAvatar);

export default router;
