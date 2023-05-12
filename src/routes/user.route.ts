import { Router } from "express";
import {
  getInterest,
  getProfile,
  updateInterest,
  updateProfile,
  uploadAvatar,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getProfile);
router.get("/interest", getInterest);

router.post("/", updateProfile);
router.post("/interest", updateInterest);
router.post("/avatar", uploadAvatar);

export default router;
