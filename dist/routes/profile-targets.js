import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { getProfileTargets, postProfileTargets } from "../modules/profile-targets/profile-targets.controller.js";
export const profileTargetsRouter = Router();
profileTargetsRouter.get("/profile/targets", requireUser, async (req, res) => {
    try {
        await getProfileTargets(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
profileTargetsRouter.post("/profile/targets", requireUser, async (req, res) => {
    try {
        await postProfileTargets(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
