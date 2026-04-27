import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { getCheatMealOptionsHandler, postCheatMealSelect } from "../modules/cheat-meals/cheat-meals.controller.js";
export const cheatMealsRouter = Router();
cheatMealsRouter.post("/cheat-meals/select", requireUser, async (req, res) => {
    try {
        await postCheatMealSelect(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
cheatMealsRouter.get("/cheat-meals/options", requireUser, async (req, res) => {
    try {
        await getCheatMealOptionsHandler(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
