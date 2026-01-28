import { InventoryItem } from "../models/InventoryItem";
import { Product } from "../models/Product";
import { InventoryItemType } from "../types/inventory";

export const getInventory = async () => {
  return await InventoryItem.find();
};

export const setInventory = async (items: InventoryItemType[]) => {
  if (!Array.isArray(items)) {
    throw new Error(
      'Some of the inventory items are missing attribute: "name" or "quantity"'
    );
  }

  for (const item of items) {
    if (!item.name || item.quantity === undefined) {
      throw new Error(
        'Some of the inventory items are missing attribute: "name" or "quantity"'
      );
    }

    const productExists = await Product.findOne({ name: item.name });
    if (!productExists) {
      throw new Error(
        "Some of the inventory items are missing in the products list"
      );
    }
  }

  await InventoryItem.deleteMany();
  await InventoryItem.insertMany(items);

  return await InventoryItem.find();
};

export const resetInventory = async () => {
  await InventoryItem.deleteMany();
  return [];
};
