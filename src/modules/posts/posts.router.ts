import { Router } from "express";
import { jsonError, jsonOk } from "../../common/http/json.js";
import { asyncHandler } from "../../common/http/async-handler.js";
import { getPostsFeed, postComment, postCreate, postLike, requireUserMiddleware } from "./posts.controller.js";

export const postsRouter = Router();

// Public feed: no auth required
postsRouter.get("/posts/feed", async (req, res) => {
  try {
    await getPostsFeed(req, res);
  } catch (err) {
    return jsonError(res, err);
  }
});

postsRouter.post("/posts", requireUserMiddleware, asyncHandler(postCreate));

postsRouter.post("/posts/comment", requireUserMiddleware, asyncHandler(postComment));

postsRouter.post("/posts/like", requireUserMiddleware, asyncHandler(postLike));

