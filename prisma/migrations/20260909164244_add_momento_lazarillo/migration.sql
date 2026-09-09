-- CreateTable
CREATE TABLE "MomentoLazarillo" (
    "id" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MomentoLazarillo_pkey" PRIMARY KEY ("id")
);
