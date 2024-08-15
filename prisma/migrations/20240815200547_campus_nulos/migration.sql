/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `indicators` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `params` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hot_id]` on the table `records` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "networks" ALTER COLUMN "issn" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "indicators_name_key" ON "indicators"("name");

-- CreateIndex
CREATE UNIQUE INDEX "params_name_key" ON "params"("name");

-- CreateIndex
CREATE UNIQUE INDEX "records_hot_id_key" ON "records"("hot_id");
