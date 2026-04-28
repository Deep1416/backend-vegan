-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('QUESTION', 'WIN', 'MEAL_IDEA', 'NEED_SUPPORT');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "acceptedCommentId" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'QUESTION';
