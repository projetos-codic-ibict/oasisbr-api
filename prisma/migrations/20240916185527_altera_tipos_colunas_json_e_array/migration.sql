/*
  Warnings:

  - The `source_ids` column on the `records` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `record` on the `records` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "records" DROP COLUMN "record",
ADD COLUMN     "record" JSONB NOT NULL,
DROP COLUMN "source_ids",
ADD COLUMN     "source_ids" TEXT[];
