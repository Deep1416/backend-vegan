import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { getWorkoutLogs, postWorkoutLog } from "../modules/workout-logs/workout-logs.controller.js";
export const workoutLogsRouter = Router();
workoutLogsRouter.get("/workout-logs", requireUser, async (req, res) => {
    try {
        await getWorkoutLogs(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
workoutLogsRouter.post("/workout-logs", requireUser, async (req, res) => {
    try {
        await postWorkoutLog(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
