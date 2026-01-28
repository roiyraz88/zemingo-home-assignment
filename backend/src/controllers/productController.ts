import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "invalid product, name is missing" });
  }

  const existing = await Product.findOne({ name });
  if (existing) {
    return res.status(400).json({ error: "product name already exists" });
  }

  await Product.create({ name });
  const products = await Product.find();
  res.status(200).json(products);
};
