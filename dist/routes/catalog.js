import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { getCatalogRecipeById, getCatalogRecipes, getCatalogWorkouts } from "../modules/catalog/catalog.controller.js";
export const catalogRouter = Router();
catalogRouter.get("/recipes", requireUser, async (_req, res) => {
    try {
        await getCatalogRecipes(_req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
catalogRouter.get("/recipes/:id", requireUser, async (req, res) => {
    try {
        await getCatalogRecipeById(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
catalogRouter.get("/workouts", requireUser, async (req, res) => {
    try {
        await getCatalogWorkouts(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
