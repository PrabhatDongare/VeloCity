/*
  Warnings:

  - You are about to drop the `ProductAccessory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductAccessory" DROP CONSTRAINT "ProductAccessory_accessoryId_fkey";

-- DropForeignKey
ALTER TABLE "ProductAccessory" DROP CONSTRAINT "ProductAccessory_productId_fkey";

-- DropTable
DROP TABLE "ProductAccessory";
