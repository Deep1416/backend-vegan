import { jsonOk } from "../../common/http/json.js";
import { getProfileTargetsService, updateProfileTargetsService } from "../../services/profile-targets-service.js";
export async function getProfileTargets(req, res) {
    const data = await getProfileTargetsService(req.userId);
    return jsonOk(res, data);
}
export async function postProfileTargets(req, res) {
    const data = await updateProfileTargetsService(req.userId, req.body);
    return jsonOk(res, data);
}
