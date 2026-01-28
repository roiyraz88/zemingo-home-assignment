import { Request, Response } from "express";
import { InventoryItem } from "../models/InventoryItem";
import { Product } from "../models/Product";

export const getInventory = async (req: Request, res: Response) => {
  const inventory = await InventoryItem.find();
  res.status(200).json(inventory);
};

export const setInventory = async (req: Request, res: Response) => {
  const items = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({
      error: 'Some of the inventory items are missing attribute: "name" or "quantity"',
    });
  }

  for (const item of items) {
    if (!item.name || item.quantity === undefined) {
      return res.status(400).json({
        error: 'Some of the inventory items are missing attribute: "name" or "quantity"',
      });
    }

    const productExists = await Product.findOne({ name: item.name });
    if (!productExists) {
      return res.status(400).json({
        error: "Some of the inventory items are missing in the products list",
      });
    }
  }

  await InventoryItem.deleteMany();
  await InventoryItem.insertMany(items);

  const inventory = await InventoryItem.find();
  res.status(200).json(inventory);
};

export const resetInventory = async (req: Request, res: Response) => {
  await InventoryItem.deleteMany();
  res.status(200).json([]);
};
