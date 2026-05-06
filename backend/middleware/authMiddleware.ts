// middleware/protect.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// ✅ Define token payload
interface JwtPayload {
  id: string;
}

// ✅ Extend Request
interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};