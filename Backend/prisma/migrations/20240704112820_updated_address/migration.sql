-- Rename the 'street_name' column to 'house_no'
ALTER TABLE "Address" RENAME COLUMN "street_name" TO "house_no";

-- Rename the 'additional' column to 'street_name'
ALTER TABLE "Address" RENAME COLUMN "additional" TO "street_name";

-- Add the new 'phone' column with a default value
ALTER TABLE "Address" ADD COLUMN "phone" INT DEFAULT NULL;
