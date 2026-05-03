import { prisma } from "../../config/prisma.js";
import { HttpError } from "../../http/http-errors.js";
export async function getAdminOverview() {
    const [users, posts, recipes, gymTrainers, pendingPlanRequests, members, trainers] = await Promise.all([
        prisma.user.count(),
        prisma.post.count(),
        prisma.recipe.count(),
        prisma.gymTrainer.count(),
        prisma.workoutPlanChangeRequest.count({ where: { status: "PENDING" } }),
        prisma.user.count({ where: { role: "MEMBER" } }),
        prisma.user.count({ where: { role: "GYM_TRAINER" } })
    ]);
    return {
        users,
        posts,
        recipes,
        gymTrainers,
        pendingPlanRequests,
        members,
        trainers,
        admins: await prisma.user.count({ where: { role: "ADMIN" } })
    };
}
export async function listUsersForAdmin(input) {
    const limit = Math.min(50, Math.max(1, input.limit));
    const page = Math.max(1, input.page);
    const skip = (page - 1) * limit;
    const q = input.q?.trim();
    const where = q
        ? {
            OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } }
            ]
        }
        : undefined;
    const [items, total] = await Promise.all([
        prisma.user.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                onboardingDone: true,
                createdAt: true,
                gymTrainerId: true
            }
        }),
        prisma.user.count({ where })
    ]);
    return { items, total, page, limit, pages: Math.ceil(total / limit) || 1 };
}
const ASSIGNABLE_ROLES = ["MEMBER", "GYM_TRAINER", "ADMIN"];
export async function updateUserRoleForAdmin(input) {
    if (!ASSIGNABLE_ROLES.includes(input.role)) {
        throw new HttpError(400, "Invalid role");
    }
    if (input.targetUserId === input.adminUserId) {
        throw new HttpError(400, "You cannot change your own role");
    }
    const target = await prisma.user.findUnique({
        where: { id: input.targetUserId },
        select: { id: true, role: true }
    });
    if (!target)
        throw new HttpError(404, "User not found");
    if (target.role === "ADMIN" && input.role !== "ADMIN") {
        const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
        if (adminCount <= 1) {
            throw new HttpError(400, "Cannot remove the last admin");
        }
    }
    return await prisma.user.update({
        where: { id: input.targetUserId },
        data: { role: input.role },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            onboardingDone: true,
            createdAt: true,
            gymTrainerId: true
        }
    });
}
