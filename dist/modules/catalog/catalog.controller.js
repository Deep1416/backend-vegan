import { jsonOk } from "../../common/http/json.js";
import { requireEnum, requireObject } from "../../common/validation/validators.js";
import { getRecipe, listRecipes, listWorkouts } from "./catalog.service.js";
export async function getCatalogRecipes(_req, res) {
    const recipes = await listRecipes();
    return jsonOk(res, recipes);
}
export async function getCatalogRecipeById(req, res) {
    const recipe = await getRecipe(req.params.id);
    return jsonOk(res, recipe);
}
export async function getCatalogWorkouts(req, res) {
    const q = requireObject(req.query);
    const goal = (q.goal ? requireEnum(q, "goal", ["FAT_LOSS", "MUSCLE_BUILD", "LIFESTYLE"]) : undefined);
    const workouts = await listWorkouts(goal);
    return jsonOk(res, workouts);
}
