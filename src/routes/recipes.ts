import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError, jsonOk } from "../http/http-response.js";
import { getSavedRecipes, postSaveRecipe } from "../modules/recipes/recipes.controller.js";

export const recipesRouter = Router();

recipesRouter.get("/recipes/saved", requireUser, async (req: AuthedRequest, res) => {
  try {
    await getSavedRecipes(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

recipesRouter.post("/recipes/save", requireUser, async (req: AuthedRequest, res) => {
  try {
    await postSaveRecipe(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

