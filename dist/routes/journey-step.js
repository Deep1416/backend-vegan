import { Router } from "express";
import { promises as fs } from "fs";
import path from "path";
import { jsonError, jsonOk } from "../http/http-response.js";
const MAX_STEP = 100;
function clampStep(value) {
    const num = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(num))
        return 0;
    return Math.max(0, Math.min(MAX_STEP, Math.floor(num)));
}
function getKey(req) {
    const userId = req.header("x-user-id")?.trim() || null;
    if (userId)
        return `user:${userId}`;
    const journeyId = req.header("x-journey-id")?.trim() || null;
    if (journeyId)
        return `anon:${journeyId}`;
    return null;
}
function getStorePath() {
    return path.join(process.cwd(), ".data", "journey-progress.json");
}
async function readStore(filePath) {
    try {
        const raw = await fs.readFile(filePath, "utf8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object")
            return parsed;
        return {};
    }
    catch {
        return {};
    }
}
async function writeStore(filePath, store) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf8");
}
export const journeyStepRouter = Router();
journeyStepRouter.get("/journey-step", async (req, res) => {
    try {
        const key = getKey(req);
        if (!key)
            return jsonOk(res, { step: 0 }, 200);
        const storePath = getStorePath();
        const store = await readStore(storePath);
        const step = clampStep(store[key]?.step ?? 0);
        return jsonOk(res, { step }, 200);
    }
    catch (err) {
        return jsonError(res, err);
    }
});
journeyStepRouter.post("/journey-step", async (req, res) => {
    try {
        const key = getKey(req);
        if (!key)
            return jsonOk(res, { step: 0 }, 200);
        const step = clampStep(req.body?.step);
        const storePath = getStorePath();
        const store = await readStore(storePath);
        store[key] = { step, updatedAt: new Date().toISOString() };
        await writeStore(storePath, store);
        return jsonOk(res, { step }, 200);
    }
    catch (err) {
        return jsonError(res, err);
    }
});
