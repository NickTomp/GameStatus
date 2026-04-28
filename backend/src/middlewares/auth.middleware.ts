import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    throw new ApiError(401, "No token provided");
  }

  const token = header.split(" ")[1];

  if (!token) {
    throw new ApiError(401, "Invalid token format");
  }

  try {
    const decoded = verifyAccessToken(token);

    (req as any).userId = decoded.userId;

    next();
  } catch {
    throw new ApiError(401, "Invalid or expired token");
  }
};