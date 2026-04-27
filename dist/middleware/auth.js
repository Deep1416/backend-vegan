import { HttpError } from "../http/http-errors.js";
import { verifyAccessToken } from "../utils/jwt.js";
export function requireUser(req, _res, next) {
    const auth = req.header("authorization") ?? "";
    const bearer = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : null;
    const userId = (bearer ? verifyAccessToken(bearer).sub : null) ??
        // Temporary dev auth:
        // - send `X-User-Id: <id>` header to authenticate
        (req.header("x-user-id") ?? null);
    if (!userId)
        return next(new HttpError(401, "Unauthorized"));
    req.userId = userId;
    return next();
}
