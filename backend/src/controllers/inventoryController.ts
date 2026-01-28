import { Request, Response } from "express";
import * as inventoryService from "../services/inventoryService";

export const getInventory = async (req: Request, res: Response) => {
  const inventory = await inventoryService.getInventory();
  res.status(200).json(inventory);
};

export const setInventory = async (req: Request, res: Response) => {
  try {
    const inventory = await inventoryService.setInventory(req.body);
    res.status(200).json(inventory);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const resetInventory = async (req: Request, res: Response) => {
  const result = await inventoryService.resetInventory();
  res.status(200).json(result);
};
