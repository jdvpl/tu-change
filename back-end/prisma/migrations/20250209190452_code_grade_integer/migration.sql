-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "studentName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "gradeId" INTEGER NOT NULL,
    "admissionDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grade" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "section" TEXT NOT NULL,

    CONSTRAINT "grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "student_gradeId_idx" ON "student"("gradeId");

-- CreateIndex
CREATE UNIQUE INDEX "grade_code_section_key" ON "grade"("code", "section");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "grade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
