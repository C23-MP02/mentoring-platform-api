import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  userId?: number;
  roles?: string[];
  providerId?: string;
}
