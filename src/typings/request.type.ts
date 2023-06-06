import { Request } from "express";
import { User } from "../models/user.model";
import { Mentor } from "../models/mentor.model";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  role?: string;
}

export interface MatchmakingRequest {
  mentee: User;
  mentors: Mentor[];
}
