import { HttpError } from "./http-errors.js";
export function jsonOk(res, data, status = 200) {
    return res.status(status).json(data);
}
export function jsonError(res, err) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
    }
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err);
    }
    return res.status(500).json({ error: "Unexpected error" });
}
