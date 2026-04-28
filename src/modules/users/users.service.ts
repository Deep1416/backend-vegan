import { prisma } from "../../config/prisma.js";
import { HttpError } from "../../common/errors/http-error.js";

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      goal: true,
      goalLocked: true,
      onboardingDone: true,
      streakCount: true,
      heightCm: true,
      weightKg: true,
      age: true,
      gender: true,
      activityLevel: true,
      calorieTargetOverride: true,
      proteinTargetOverride: true,
      hydrationTargetOverride: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

export async function updateUserProfile(
  userId: string,
  input: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
) {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        name: input.name ?? undefined,
        email: input.email ?? undefined,
        image: input.image ?? undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        goal: true,
        goalLocked: true,
        onboardingDone: true,
        streakCount: true,
        heightCm: true,
        weightKg: true,
        age: true,
        gender: true,
        activityLevel: true,
        calorieTargetOverride: true,
        proteinTargetOverride: true,
        hydrationTargetOverride: true,
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (err: any) {
    if (err?.code === "P2002") throw new HttpError(400, "Email already in use");
    throw err;
  }
}

export async function searchUsers(searchText: string, limit = 10) {
  const normalizedSearchText = searchText.trim();
  if (!normalizedSearchText) return [];
  const maxResults = Math.max(1, Math.min(20, limit));

  return await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: normalizedSearchText, mode: "insensitive" } },
        { email: { contains: normalizedSearchText, mode: "insensitive" } }
      ]
    },
    orderBy: { updatedAt: "desc" },
    take: maxResults,
    select: {
      id: true,
      name: true,
      email: true,
      image: true
    }
  });
}

