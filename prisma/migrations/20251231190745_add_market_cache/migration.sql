-- CreateTable
CREATE TABLE "MarketCache" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MarketCache_symbol_range_key" ON "MarketCache"("symbol", "range");
