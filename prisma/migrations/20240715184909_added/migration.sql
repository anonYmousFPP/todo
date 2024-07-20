/*
  Warnings:

  - You are about to drop the column `userId` on the `Todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
