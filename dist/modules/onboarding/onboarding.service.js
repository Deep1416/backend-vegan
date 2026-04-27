import { prisma } from "../../config/prisma.js";
import { HttpError } from "../../common/errors/http-error.js";
export async function completeOnboarding(userId, input) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new HttpError(404, "User not found");
    if (user.goalLocked && input.goal !== user.goal) {
        throw new HttpError(400, "Goal is permanent and cannot be changed");
    }
    const lockGoal = input.goal === "FAT_LOSS" || input.goal === "MUSCLE_BUILD";
    await prisma.user.update({
        where: { id: userId },
        data: {
            ...input,
            goalLocked: user.goalLocked || lockGoal,
            onboardingDone: true
        }
    });
    return { success: true };
}
