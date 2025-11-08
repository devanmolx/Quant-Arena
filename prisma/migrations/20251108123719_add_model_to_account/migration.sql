/*
  Warnings:

  - Added the required column `model` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `AgentInvocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "model" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AgentInvocation" ADD COLUMN     "accountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AgentInvocation" ADD CONSTRAINT "AgentInvocation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
