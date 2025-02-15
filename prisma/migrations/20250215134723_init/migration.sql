-- CreateTable
CREATE TABLE "Perlengkapan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Perlengkapan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kebutuhan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "perlengkapanId" TEXT,

    CONSTRAINT "Kebutuhan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Kebutuhan" ADD CONSTRAINT "Kebutuhan_perlengkapanId_fkey" FOREIGN KEY ("perlengkapanId") REFERENCES "Perlengkapan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
