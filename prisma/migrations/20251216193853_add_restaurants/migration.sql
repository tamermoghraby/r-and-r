-- =========================
-- 1. Create Restaurant table
-- =========================
CREATE TABLE "Restaurant" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "address" TEXT,
  "phone" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- =========================
-- 2. Insert default restaurant
-- =========================
INSERT INTO "Restaurant" ("id", "name")
VALUES ('r_and_r', 'R & R Restaurant');

-- =========================
-- 3. Add restaurantId as NULLABLE
-- =========================
ALTER TABLE "Expense" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "Ingredient" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "MenuItem" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "Order" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "Purchase" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "User" ADD COLUMN "restaurantId" TEXT;
ALTER TABLE "User" ADD COLUMN "email" TEXT;

-- =========================
-- 4. Backfill existing data
-- =========================
UPDATE "Expense" SET "restaurantId" = 'r_and_r';
UPDATE "Ingredient" SET "restaurantId" = 'r_and_r';
UPDATE "MenuItem" SET "restaurantId" = 'r_and_r';
UPDATE "Order" SET "restaurantId" = 'r_and_r';
UPDATE "Purchase" SET "restaurantId" = 'r_and_r';
UPDATE "User" SET "restaurantId" = 'r_and_r';

-- =========================
-- 5. Make columns REQUIRED
-- =========================
ALTER TABLE "Expense" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "Ingredient" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "MenuItem" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "Order" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "Purchase" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "restaurantId" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- =========================
-- 6. Indexes
-- =========================
DROP INDEX IF EXISTS "MenuItem_name_key";

CREATE UNIQUE INDEX "MenuItem_restaurantId_name_key"
ON "MenuItem"("restaurantId", "name");

CREATE UNIQUE INDEX "Ingredient_restaurantId_name_key"
ON "Ingredient"("restaurantId", "name");

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- =========================
-- 7. Foreign keys
-- =========================
ALTER TABLE "User"
ADD CONSTRAINT "User_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");

ALTER TABLE "Ingredient"
ADD CONSTRAINT "Ingredient_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");

ALTER TABLE "MenuItem"
ADD CONSTRAINT "MenuItem_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");

ALTER TABLE "Order"
ADD CONSTRAINT "Order_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");

ALTER TABLE "Expense"
ADD CONSTRAINT "Expense_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");

ALTER TABLE "Purchase"
ADD CONSTRAINT "Purchase_restaurantId_fkey"
FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id");
