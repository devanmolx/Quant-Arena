-- CreateTable
CREATE TABLE "AgentInvocation" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "minutesSinceStart" INTEGER NOT NULL,
    "invocationCount" INTEGER NOT NULL,
    "accountValue" DOUBLE PRECISION NOT NULL,
    "availableCash" DOUBLE PRECISION NOT NULL,
    "totalReturn" DOUBLE PRECISION NOT NULL,
    "openPositions" JSONB NOT NULL,
    "toolCalls" JSONB,
    "response" TEXT NOT NULL,

    CONSTRAINT "AgentInvocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalReturn" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "initialCapital" DOUBLE PRECISION NOT NULL DEFAULT 10000,
    "availableCash" DOUBLE PRECISION NOT NULL DEFAULT 10000,
    "accountValue" DOUBLE PRECISION NOT NULL DEFAULT 10000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "entryPrice" DOUBLE PRECISION NOT NULL,
    "exitPrice" DOUBLE PRECISION,
    "quantity" DOUBLE PRECISION NOT NULL,
    "leverage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "pnl" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExitPLAN" (
    "id" SERIAL NOT NULL,
    "profitTarget" DOUBLE PRECISION NOT NULL,
    "stopLoss" DOUBLE PRECISION NOT NULL,
    "invalidationCondition" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,

    CONSTRAINT "ExitPLAN_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExitPLAN_positionId_key" ON "ExitPLAN"("positionId");

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExitPLAN" ADD CONSTRAINT "ExitPLAN_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;
