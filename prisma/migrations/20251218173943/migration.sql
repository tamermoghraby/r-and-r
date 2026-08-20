/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ingredient_restaurantId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_restaurantId_name_key" ON "Ingredient"("restaurantId", "name");
