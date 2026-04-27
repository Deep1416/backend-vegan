import { HttpError } from "../errors/http-error.js";
export function requireObject(value, message = "Invalid payload") {
    if (!value || typeof value !== "object" || Array.isArray(value))
        throw new HttpError(400, message);
    return value;
}
export function requireString(obj, key, opts, message) {
    const raw = obj[key];
    if (typeof raw !== "string")
        throw new HttpError(400, message ?? `Invalid ${key}`);
    const value = opts?.trim ? raw.trim() : raw;
    if (opts?.min != null && value.length < opts.min)
        throw new HttpError(400, message ?? `Invalid ${key}`);
    if (opts?.max != null && value.length > opts.max)
        throw new HttpError(400, message ?? `Invalid ${key}`);
    return value;
}
export function optionalString(obj, key, opts) {
    const raw = obj[key];
    if (raw == null)
        return undefined;
    if (typeof raw !== "string")
        throw new HttpError(400, `Invalid ${key}`);
    const value = opts?.trim ? raw.trim() : raw;
    if (opts?.max != null && value.length > opts.max)
        throw new HttpError(400, `Invalid ${key}`);
    return value;
}
export function requireEmail(obj, key = "email") {
    const email = requireString(obj, key, { trim: true, min: 3, max: 320 }, "Invalid email").toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw new HttpError(400, "Invalid email");
    return email;
}
export function requireInt(obj, key, opts, message) {
    const raw = obj[key];
    if (typeof raw !== "number" || !Number.isFinite(raw) || !Number.isInteger(raw))
        throw new HttpError(400, message ?? `Invalid ${key}`);
    if (opts?.min != null && raw < opts.min)
        throw new HttpError(400, message ?? `Invalid ${key}`);
    if (opts?.max != null && raw > opts.max)
        throw new HttpError(400, message ?? `Invalid ${key}`);
    return raw;
}
export function optionalNumber(obj, key) {
    const raw = obj[key];
    if (raw == null)
        return undefined;
    if (typeof raw !== "number" || !Number.isFinite(raw))
        throw new HttpError(400, `Invalid ${key}`);
    return raw;
}
export function optionalBoolean(obj, key) {
    const raw = obj[key];
    if (raw == null)
        return undefined;
    if (typeof raw !== "boolean")
        throw new HttpError(400, `Invalid ${key}`);
    return raw;
}
export function requireEnum(obj, key, values, message) {
    const v = requireString(obj, key, { trim: true }, message ?? `Invalid ${key}`);
    if (!values.includes(v))
        throw new HttpError(400, message ?? `Invalid ${key}`);
    return v;
}
export function optionalIsoDateTimeString(obj, key) {
    const raw = obj[key];
    if (raw == null)
        return undefined;
    if (typeof raw !== "string")
        throw new HttpError(400, `Invalid ${key}`);
    const d = new Date(raw);
    if (Number.isNaN(d.getTime()))
        throw new HttpError(400, `Invalid ${key}`);
    return raw;
}
