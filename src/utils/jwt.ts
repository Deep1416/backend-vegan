import jwt from "jsonwebtoken";
import { HttpError } from "../http/http-errors.js";

type JwtPayload = {
  sub: string;
};

function requireJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new HttpError(500, "JWT_SECRET not configured");
  return secret;
}

export function signAccessToken(userId: string) {
  const secret = requireJwtSecret();
  return jwt.sign({ sub: userId } satisfies JwtPayload, secret, { expiresIn: "7d" });
}

export function verifyAccessToken(token: string): JwtPayload {
  const secret = requireJwtSecret();
  const decoded = jwt.verify(token, secret) as any;
  if (!decoded?.sub) throw new HttpError(401, "Invalid token");
  return { sub: String(decoded.sub) };
}

