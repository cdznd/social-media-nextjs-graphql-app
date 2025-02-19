/*
  Warnings:

  - Made the column `actorId` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `entityType` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_actorId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "actorId" SET NOT NULL,
ALTER COLUMN "entityType" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
