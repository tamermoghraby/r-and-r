/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ingredient_name_key";

-- DropIndex
DROP INDEX "Ingredient_restaurantId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_restaurantId_key" ON "Ingredient"("restaurantId");
