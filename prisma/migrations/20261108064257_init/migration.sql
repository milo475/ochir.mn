-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('NEW', 'CONTACTED', 'ACTIVE', 'CLOSED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "services" TEXT[],
    "packages" TEXT[],
    "businessName" TEXT NOT NULL,
    "socialLink" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dailyOrders" INTEGER,
    "status" "OrderStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");
