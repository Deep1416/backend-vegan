import type { Response } from "express";
import type { AuthedRequest } from "../../common/auth/require-user.js";
import { jsonOk } from "../../common/http/json.js";
import { requireObject, requireString } from "../../common/validation/validators.js";
import { listSavedRecipes, saveRecipe } from "./recipes.service.js";

export async function getSavedRecipes(req: AuthedRequest, res: Response) {
  const saved = await listSavedRecipes(req.userId!);
  return jsonOk(res, saved);
}

export async function postSaveRecipe(req: AuthedRequest, res: Response) {
  const body = requireObject(req.body);
  const recipeId = requireString(body, "recipeId", { trim: true, min: 8 });
  const result = await saveRecipe(req.userId!, recipeId);
  return jsonOk(res, result);
}

