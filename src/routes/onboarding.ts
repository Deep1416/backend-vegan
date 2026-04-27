import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError, jsonOk } from "../http/http-response.js";
import { postOnboarding } from "../modules/onboarding/onboarding.controller.js";

export const onboardingRouter = Router();

onboardingRouter.post("/onboarding", requireUser, async (req: AuthedRequest, res) => {
  try {
    await postOnboarding(req, res);
    return;
  } catch (err) {
    return jsonError(res, err);
  }
});

