import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const products = await productService.addProduct(req.body.name);
    res.status(200).json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
