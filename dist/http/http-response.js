import { HttpError } from "./http-errors.js";
import { mapInfrastructureError } from "../common/errors/infra-error-map.js";
export function jsonOk(res, data, status = 200) {
    return res.status(status).json(data);
}
export function jsonError(res, err) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message });
    }
    const infra = mapInfrastructureError(err);
    if (infra) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(infra.status).json({ error: infra.message });
    }
    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ error: message });
    }
    return res.status(500).json({ error: "Unexpected error" });
}
