-- CreateTable
CREATE TABLE "GymProgressPhoto" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GymProgressPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MissedWorkoutReport" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gymTrainerId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MissedWorkoutReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GymProgressPhoto_userId_createdAt_idx" ON "GymProgressPhoto"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "MissedWorkoutReport_userId_createdAt_idx" ON "MissedWorkoutReport"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "MissedWorkoutReport_gymTrainerId_createdAt_idx" ON "MissedWorkoutReport"("gymTrainerId", "createdAt");

-- AddForeignKey
ALTER TABLE "GymProgressPhoto" ADD CONSTRAINT "GymProgressPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissedWorkoutReport" ADD CONSTRAINT "MissedWorkoutReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MissedWorkoutReport" ADD CONSTRAINT "MissedWorkoutReport_gymTrainerId_fkey" FOREIGN KEY ("gymTrainerId") REFERENCES "GymTrainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
