import { prisma } from "../../config/prisma.js";

export async function getFeed() {
  return await prisma.post.findMany({
    include: {
      user: { select: { id: true, name: true, goal: true } },
      comments: { include: { user: { select: { name: true } } } },
      likes: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function createPost(userId: string, input: { content: string; recipeLink?: string | null }) {
  await prisma.post.create({
    data: {
      userId,
      content: input.content,
      recipeLink: input.recipeLink ?? null
    }
  });
}

export async function addComment(userId: string, input: { postId: string; content: string }) {
  await prisma.comment.create({ data: { userId, postId: input.postId, content: input.content } });
}

export async function toggleLike(userId: string, postId: string) {
  const existing = await prisma.postLike.findUnique({ where: { userId_postId: { userId, postId } } });
  if (existing) {
    await prisma.postLike.delete({ where: { userId_postId: { userId, postId } } });
    return { liked: false };
  }
  await prisma.postLike.create({ data: { userId, postId } });
  return { liked: true };
}

