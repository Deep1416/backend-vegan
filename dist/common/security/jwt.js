import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { HttpError } from "../errors/http-error.js";
export function signAccessToken(userId) {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: "7d" });
}
export function verifyAccessToken(token) {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded?.sub)
        throw new HttpError(401, "Invalid token");
    return { sub: String(decoded.sub) };
}
