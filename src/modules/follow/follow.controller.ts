import type { Response } from "express";
import type { AuthedRequest } from "../../common/auth/require-user.js";
import { jsonOk } from "../../common/http/json.js";
import { requireObject, requireString } from "../../common/validation/validators.js";
import { toggleFollow } from "./follow.service.js";

export async function postFollow(req: AuthedRequest, res: Response) {
  const body = requireObject(req.body);
  const userId = requireString(body, "userId", { trim: true, min: 8 });
  if (userId === req.userId) return jsonOk(res, { error: "You cannot follow yourself" }, 400);

  const result = await toggleFollow(req.userId!, userId);
  return jsonOk(res, result.body, result.status);
}

