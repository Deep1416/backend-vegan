import type { Response } from "express";
import type { AuthedRequest } from "../../common/auth/require-user.js";
import { jsonOk } from "../../common/http/json.js";
import { HttpError } from "../../common/errors/http-error.js";
import { requireEnum, requireInt, requireObject } from "../../common/validation/validators.js";
import { completeOnboarding } from "./onboarding.service.js";

export async function postOnboarding(req: AuthedRequest, res: Response) {
  const body = requireObject(req.body);
  const payload = {
    heightCm: requireInt(body, "heightCm", { min: 100, max: 260 }),
    weightKg: Number(body.weightKg),
    age: requireInt(body, "age", { min: 12, max: 100 }),
    gender: requireEnum(body, "gender", ["FEMALE", "MALE", "OTHER"] as const),
    activityLevel: requireEnum(body, "activityLevel", ["SEDENTARY", "LIGHT", "MODERATE", "ACTIVE", "ATHLETE"] as const),
    goal: requireEnum(body, "goal", ["FAT_LOSS", "MUSCLE_BUILD", "LIFESTYLE"] as const)
  };
  if (!Number.isFinite(payload.weightKg) || payload.weightKg < 30 || payload.weightKg > 300) throw new HttpError(400, "Invalid weightKg");

  const result = await completeOnboarding(req.userId!, payload);
  return jsonOk(res, result);
}

