-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('MEMBER', 'GYM_TRAINER');

-- CreateEnum
CREATE TYPE "PlanChangeStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'MEMBER';
ALTER TABLE "User" ADD COLUMN "gymTrainerId" TEXT;
ALTER TABLE "User" ADD COLUMN "approvedGymPlanJson" TEXT;

-- CreateTable
CREATE TABLE "GymTrainer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "linkedUserId" TEXT,

    CONSTRAINT "GymTrainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanChangeRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gymTrainerId" TEXT NOT NULL,
    "status" "PlanChangeStatus" NOT NULL DEFAULT 'PENDING',
    "memberNote" TEXT,
    "proposedSessionsJson" TEXT NOT NULL,
    "trainerComment" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutPlanChangeRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GymTrainer_linkedUserId_key" ON "GymTrainer"("linkedUserId");

-- CreateIndex
CREATE INDEX "GymTrainer_sortOrder_idx" ON "GymTrainer"("sortOrder");

-- CreateIndex
CREATE INDEX "WorkoutPlanChangeRequest_userId_createdAt_idx" ON "WorkoutPlanChangeRequest"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "WorkoutPlanChangeRequest_gymTrainerId_status_idx" ON "WorkoutPlanChangeRequest"("gymTrainerId", "status");

-- AddForeignKey
ALTER TABLE "GymTrainer" ADD CONSTRAINT "GymTrainer_linkedUserId_fkey" FOREIGN KEY ("linkedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gymTrainerId_fkey" FOREIGN KEY ("gymTrainerId") REFERENCES "GymTrainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanChangeRequest" ADD CONSTRAINT "WorkoutPlanChangeRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanChangeRequest" ADD CONSTRAINT "WorkoutPlanChangeRequest_gymTrainerId_fkey" FOREIGN KEY ("gymTrainerId") REFERENCES "GymTrainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanChangeRequest" ADD CONSTRAINT "WorkoutPlanChangeRequest_reviewedByUserId_fkey" FOREIGN KEY ("reviewedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
