import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError, jsonOk } from "../http/http-response.js";
import { getUser, getUsersSearch, patchMe } from "../modules/users/users.controller.js";

export const usersRouter = Router();

usersRouter.get("/users/search", requireUser, async (req: AuthedRequest, res) => {
  try {
    await getUsersSearch(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

usersRouter.get("/users/:id", requireUser, async (req: AuthedRequest, res) => {
  try {
    await getUser(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

usersRouter.patch("/users/me", requireUser, async (req: AuthedRequest, res) => {
  try {
    await patchMe(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

