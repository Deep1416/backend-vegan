import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError, jsonOk } from "../http/http-response.js";
import { asyncHandler } from "../common/http/async-handler.js";
import { getTracker, postTracker } from "../modules/tracker/tracker.controller.js";

export const trackerRouter = Router();

trackerRouter.get("/tracker", requireUser, async (req: AuthedRequest, res) => {
  try {
    await getTracker(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

trackerRouter.post("/tracker", requireUser, asyncHandler(postTracker));

