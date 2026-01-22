-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'MODERATE', 'HARD', 'EXTREME');

-- CreateEnum
CREATE TYPE "HikerLevel" AS ENUM ('NEWBIE', 'HIKER', 'PORTER', 'RANGER');

-- CreateTable
CREATE TABLE "Trail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "openedAt" TIMESTAMP(3) NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hiker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "level" "HikerLevel" NOT NULL,

    CONSTRAINT "Hiker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permit" (
    "id" TEXT NOT NULL,
    "hikerId" TEXT NOT NULL,
    "trailId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_hikerId_fkey" FOREIGN KEY ("hikerId") REFERENCES "Hiker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "Trail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
