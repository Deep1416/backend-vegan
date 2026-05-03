import { Router } from "express";
import { requireUser } from "../middleware/auth.js";
import { jsonError } from "../http/http-response.js";
import { getGymTrainers, postPlanChangeRequest, getMyPlanRequest, getTrainerPlanQueue, postReviewPlanRequest } from "../modules/gym/gym.controller.js";
export const gymRouter = Router();
gymRouter.get("/gym/trainers", requireUser, async (req, res) => {
    try {
        await getGymTrainers(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
gymRouter.post("/gym/plan-requests", requireUser, async (req, res) => {
    try {
        await postPlanChangeRequest(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
gymRouter.get("/gym/plan-requests/me", requireUser, async (req, res) => {
    try {
        await getMyPlanRequest(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
gymRouter.get("/gym/plan-requests/trainer-queue", requireUser, async (req, res) => {
    try {
        await getTrainerPlanQueue(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
gymRouter.post("/gym/plan-requests/review", requireUser, async (req, res) => {
    try {
        await postReviewPlanRequest(req, res);
        return;
    }
    catch (err) {
        return jsonError(res, err);
    }
});
