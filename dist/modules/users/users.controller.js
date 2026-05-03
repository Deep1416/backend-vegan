import { jsonOk } from "../../common/http/json.js";
import { optionalString, requireEmail, requireObject, requireString } from "../../common/validation/validators.js";
import { getUserById, searchUsers, updateUserProfile } from "./users.service.js";
export async function getMe(req, res) {
    const user = await getUserById(req.userId);
    return jsonOk(res, user);
}
export async function getUser(req, res) {
    const user = await getUserById(req.params.id);
    return jsonOk(res, user);
}
export async function patchMe(req, res) {
    const body = requireObject(req.body);
    const name = optionalString(body, "name", { trim: true, max: 120 });
    const image = optionalString(body, "image", { trim: true, max: 1000 });
    let email;
    if (body.email != null)
        email = requireEmail(body, "email");
    let gymTrainerId;
    if (body.gymTrainerId === null) {
        gymTrainerId = null;
    }
    else if (body.gymTrainerId !== undefined) {
        gymTrainerId = requireString(body, "gymTrainerId", { trim: true, min: 10, max: 40 });
    }
    const updated = await updateUserProfile(req.userId, {
        name: name == null ? undefined : name,
        email: email == null ? undefined : email,
        image: image == null ? undefined : image,
        gymTrainerId
    });
    return jsonOk(res, updated);
}
export async function getUsersSearch(req, res) {
    const searchText = typeof req.query?.q === "string" ? String(req.query.q) : "";
    const requestedLimitRaw = req.query?.limit;
    const requestedLimit = typeof requestedLimitRaw === "string" ? Number(requestedLimitRaw) : typeof requestedLimitRaw === "number" ? requestedLimitRaw : 10;
    const safeLimit = Number.isFinite(requestedLimit) ? Math.max(1, Math.min(20, Math.floor(requestedLimit))) : 10;
    const results = await searchUsers(searchText, safeLimit);
    return jsonOk(res, results);
}
