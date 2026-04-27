import type { Response } from "express";
import type { AuthedRequest } from "../../common/auth/require-user.js";
import { jsonOk } from "../../common/http/json.js";
import { requireObject, requireString } from "../../common/validation/validators.js";
import { getCheatMealOptions, selectCheatMeal } from "./cheat-meals.service.js";

export async function postCheatMealSelect(req: AuthedRequest, res: Response) {
  const body = requireObject(req.body);
  const recipeId = requireString(body, "recipeId", { trim: true, min: 8 });
  const result = await selectCheatMeal(req.userId!, recipeId);
  return jsonOk(res, result);
}

export async function getCheatMealOptionsHandler(req: AuthedRequest, res: Response) {
  const result = await getCheatMealOptions(req.userId!);
  return jsonOk(res, result);
}

