import { AuthenticatedRequest } from "../typings/request.type";
import { Response, NextFunction } from "express";
import { firebaseAuth } from "../config/firebase";

/**
 * Middleware to check if the request is authenticated.
 * It verifies the Firebase ID token in the authorization header.
 * If the token is valid, it sets the authenticated user ID and role on the request object.
 * Otherwise, it sends an unauthorized response.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {Response} res - The response object used to send the unauthorized response.
 * @param {NextFunction} next - The next middleware or route handler.
 */
export const isAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.split("Bearer ")[1];

    firebaseAuth
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.userId = decodedToken.uid;
        req.role = decodedToken.role;
        next();
      })
      .catch((error) => {
        console.error("Error verifying Firebase ID token:", error);
        res.status(403).json({ error: "Unauthorized" });
      });
  } else {
    res.status(401).json({ error: "Missing or invalid authorization header" });
  }
};

/**
 * Middleware to check if the authenticated user is a mentee.
 * If the user is a mentee, it proceeds to the next middleware or route handler.
 * Otherwise, it sends an unauthorized response.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {Response} res - The response object used to send the unauthorized response.
 * @param {NextFunction} next - The next middleware or route handler.
 */
export const isMentee = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.role === "mentee") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

/**
 * Middleware to check if the authenticated user is a mentor.
 * If the user is a mentor, it proceeds to the next middleware or route handler.
 * Otherwise, it sends an unauthorized response.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {Response} res - The response object used to send the unauthorized response.
 * @param {NextFunction} next - The next middleware or route handler.
 */
export const isMentor = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.role === "mentor") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

/**
 * Middleware to check if the authenticated user is an admin.
 * If the user is an admin, it proceeds to the next middleware or route handler.
 * Otherwise, it sends an unauthorized response.
 *
 * @param {AuthenticatedRequest} req - The authenticated request object.
 * @param {Response} res - The response object used to send the unauthorized response.
 * @param {NextFunction} next - The next middleware or route handler.
 */
export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};
