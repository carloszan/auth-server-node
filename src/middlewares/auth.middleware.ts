import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtToken {
  id: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const tokenData = jwt.verify(token, "secret");

    const { id } = tokenData as JwtToken;
    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
