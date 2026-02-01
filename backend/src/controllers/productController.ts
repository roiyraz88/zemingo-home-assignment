import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

export const upsertProduct = async (req: Request, res: Response) => {
  try {
    const products = await productService.upsertProduct(req.body);
    res.status(200).json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  try {
    const { name } = req.params;
    const products = await productService.deleteProduct(name);
    res.status(200).json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
