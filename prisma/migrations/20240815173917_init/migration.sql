-- CreateTable
CREATE TABLE "evolution_indicators" (
    "id" SERIAL NOT NULL,
    "sourceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numberOfNetworks" INTEGER NOT NULL,
    "numberOfDocuments" INTEGER NOT NULL,

    CONSTRAINT "evolution_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ids" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "networks" (
    "id" INTEGER NOT NULL,
    "acronym" TEXT NOT NULL,
    "issn" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "validSize" INTEGER NOT NULL,
    "uf" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "networks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "params" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "params_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "records" (
    "brcris_id" TEXT NOT NULL,
    "hot_id" TEXT NOT NULL,
    "missed" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "record" TEXT NOT NULL,
    "source_ids" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "records_pkey" PRIMARY KEY ("brcris_id")
);
