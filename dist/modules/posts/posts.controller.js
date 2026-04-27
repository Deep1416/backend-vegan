import { jsonOk } from "../../common/http/json.js";
import { requireUser } from "../../common/auth/require-user.js";
import { optionalString, requireObject, requireString } from "../../common/validation/validators.js";
import { addComment, createPost, getFeed, toggleLike } from "./posts.service.js";
export async function getPostsFeed(_req, res) {
    const posts = await getFeed();
    return jsonOk(res, posts);
}
export const requireUserMiddleware = requireUser;
export async function postCreate(req, res) {
    const body = requireObject(req.body);
    const content = requireString(body, "content", { trim: true, min: 1, max: 2200 });
    const recipeLink = optionalString(body, "recipeLink", { trim: true, max: 500 }) ?? null;
    await createPost(req.userId, { content, recipeLink });
    return jsonOk(res, { success: true }, 201);
}
export async function postComment(req, res) {
    const body = requireObject(req.body);
    const postId = requireString(body, "postId", { trim: true, min: 8 });
    const content = requireString(body, "content", { trim: true, min: 1, max: 1000 });
    await addComment(req.userId, { postId, content });
    return jsonOk(res, { success: true }, 201);
}
export async function postLike(req, res) {
    const body = requireObject(req.body);
    const postId = requireString(body, "postId", { trim: true, min: 8 });
    const result = await toggleLike(req.userId, postId);
    return jsonOk(res, result);
}
