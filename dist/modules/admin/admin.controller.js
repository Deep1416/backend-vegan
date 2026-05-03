import { HttpError } from "../../http/http-errors.js";
import { jsonOk } from "../../common/http/json.js";
import { requireEnum, requireObject } from "../../common/validation/validators.js";
import { getAdminOverview, listUsersForAdmin, updateUserRoleForAdmin } from "./admin.service.js";
const ROLE_VALUES = ["MEMBER", "GYM_TRAINER", "ADMIN"];
export async function getOverview(_req, res) {
    const data = await getAdminOverview();
    return jsonOk(res, data);
}
export async function getUsers(req, res) {
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? "20"), 10) || 20));
    const q = typeof req.query.q === "string" ? req.query.q : undefined;
    const data = await listUsersForAdmin({ page, limit, q });
    return jsonOk(res, data);
}
export async function patchUserRole(req, res) {
    const body = requireObject(req.body);
    const role = requireEnum(body, "role", ROLE_VALUES);
    const targetUserId = String(req.params.id ?? "").trim();
    if (targetUserId.length < 10)
        throw new HttpError(400, "Invalid id");
    const updated = await updateUserRoleForAdmin({
        adminUserId: req.userId,
        targetUserId,
        role
    });
    return jsonOk(res, updated);
}
