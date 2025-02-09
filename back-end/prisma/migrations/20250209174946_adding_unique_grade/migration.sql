/*
  Warnings:

  - A unique constraint covering the columns `[code,section]` on the table `grade` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "grade_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "grade_code_section_key" ON "grade"("code", "section");
