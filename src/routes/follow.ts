import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { postFollow } from "../modules/follow/follow.controller.js";

export const followRouter = Router();

followRouter.post("/follow", requireUser, async (req: AuthedRequest, res) => {
  try {
    await postFollow(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

