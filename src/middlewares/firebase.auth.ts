import { AuthenticatedRequest } from "../typings/request.type";
import { Response, NextFunction } from "express";
import { firebaseAuth } from "../config/firebase";

export const isAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Extract the authorization header from the request
  const authorizationHeader = req.headers.authorization;

  // Check if the authorization header exists and has the correct format
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.split("Bearer ")[1];

    // Verify the Firebase ID token
    firebaseAuth
      .verifyIdToken(token)
      .then((decodedToken) => {
        // Set the authenticated user ID on the request
        req.userId = Number(decodedToken.record_id);
        req.roles = decodedToken.roles;
        req.providerId = decodedToken.uid;

        // Proceed to the next middleware or route handler
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

export const isMentee = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.roles?.includes("mentee")) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

export const isMentor = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.roles?.includes("mentor")) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.roles?.includes("admin")) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};
