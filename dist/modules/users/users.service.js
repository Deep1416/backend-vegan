import { prisma } from "../../config/prisma.js";
import { HttpError } from "../../common/errors/http-error.js";
export async function getUserById(id) {
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
            role: true,
            gymTrainerId: true,
            approvedGymPlanJson: true,
            createdAt: true,
            updatedAt: true,
            gymTrainer: {
                select: {
                    id: true,
                    name: true,
                    title: true,
                    bio: true,
                    imageUrl: true
                }
            }
        }
    });
}
export async function updateUserProfile(userId, input) {
    if (input.gymTrainerId !== undefined && input.gymTrainerId !== null) {
        const t = await prisma.gymTrainer.findUnique({ where: { id: input.gymTrainerId } });
        if (!t)
            throw new HttpError(400, "Invalid gym trainer");
    }
    try {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                name: input.name ?? undefined,
                email: input.email ?? undefined,
                image: input.image ?? undefined,
                gymTrainerId: input.gymTrainerId === undefined ? undefined : input.gymTrainerId
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
                role: true,
                gymTrainerId: true,
                approvedGymPlanJson: true,
                createdAt: true,
                updatedAt: true,
                gymTrainer: {
                    select: {
                        id: true,
                        name: true,
                        title: true,
                        bio: true,
                        imageUrl: true
                    }
                }
            }
        });
    }
    catch (err) {
        if (err?.code === "P2002")
            throw new HttpError(400, "Email already in use");
        throw err;
    }
}
export async function searchUsers(searchText, limit = 10) {
    const normalizedSearchText = searchText.trim();
    if (!normalizedSearchText)
        return [];
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
