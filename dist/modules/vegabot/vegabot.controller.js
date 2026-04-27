import { jsonOk } from "../../common/http/json.js";
import { requireEnum, requireObject, requireString } from "../../common/validation/validators.js";
import { generateOfflineReply } from "./vegabot.service.js";
export async function postVegabot(req, res) {
    const body = requireObject(req.body);
    const goal = requireEnum(body, "goal", ["FAT_LOSS", "MUSCLE_BUILD", "LIFESTYLE"]);
    const todayWorkout = requireString(body, "todayWorkout", { trim: true, min: 3, max: 2200 });
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const lastUser = [...messages].reverse().find((m) => m?.role === "user")?.content ?? "";
    const result = generateOfflineReply({ goal, lastUser });
    return jsonOk(res, { ...result, todayWorkout });
}
