import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { postVegabot } from "../modules/vegabot/vegabot.controller.js";
export const vegabotRouter = Router();
// Minimal standalone version: returns a practical coach reply without depending on Next.js libs.
vegabotRouter.post("/vegabot", requireUser, async (req, res) => {
    try {
        await postVegabot(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
