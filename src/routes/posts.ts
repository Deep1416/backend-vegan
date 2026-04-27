import { Router } from "express";
import { requireUser, type AuthedRequest } from "../middleware/auth.js";
import { jsonError, jsonOk } from "../http/http-response.js";
import { prisma } from "../db/prisma.js";
import { requireObject, requireString, optionalString } from "../common/validation/validators.js";

export const postsRouter = Router();

postsRouter.get("/posts/feed", async (_req, res) => {
	try {
		const posts = await prisma.post.findMany({
			include: {
				user: { select: { id: true, name: true, goal: true } },
				comments: { include: { user: { select: { name: true } } } },
				likes: true,
			},
			orderBy: { createdAt: "desc" },
		});
		return jsonOk(res, posts);
	} catch (err) {
		return jsonError(res, err);
	}
});

postsRouter.post("/posts", requireUser, async (req: AuthedRequest, res) => {
	try {
		const body = requireObject(req.body);
		const payload = {
			content: requireString(body, "content", { trim: true, min: 1, max: 2200 }),
			recipeLink: optionalString(body, "recipeLink", { trim: true, max: 500 }),
		};
		await prisma.post.create({
			data: {
				userId: req.userId!,
				content: payload.content,
				recipeLink: payload.recipeLink ?? null,
			},
		});
		return jsonOk(res, { success: true }, 201);
	} catch (err) {
		return jsonError(res, err);
	}
});

postsRouter.post("/posts/comment", requireUser, async (req: AuthedRequest, res) => {
	try {
		const body = requireObject(req.body);
		const postId = requireString(body, "postId", { trim: true, min: 8 });
		const content = requireString(body, "content", { trim: true, min: 1, max: 1000 });
		await prisma.comment.create({ data: { userId: req.userId!, postId, content } });
		return jsonOk(res, { success: true }, 201);
	} catch (err) {
		return jsonError(res, err);
	}
});

postsRouter.post("/posts/like", requireUser, async (req: AuthedRequest, res) => {
	try {
		const body = requireObject(req.body);
		const postId = requireString(body, "postId", { trim: true, min: 8 });
		const existing = await prisma.postLike.findUnique({ where: { userId_postId: { userId: req.userId!, postId } } });
		if (existing) {
			await prisma.postLike.delete({ where: { userId_postId: { userId: req.userId!, postId } } });
			return jsonOk(res, { liked: false });
		}
		await prisma.postLike.create({ data: { userId: req.userId!, postId } });
		return jsonOk(res, { liked: true });
	} catch (err) {
		return jsonError(res, err);
	}
});
