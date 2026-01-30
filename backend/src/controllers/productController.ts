import { Request, Response } from "express";
import { ProductType } from "../types/product";
import * as productService from "../services/productService";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

export const addProduct = async (
  req: Request<{}, {}, ProductType>,
  res: Response
) => {
  try {
    const products = await productService.addProduct(req.body);
    res.status(200).json(products);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (
  req: Request<{ oldName: string }, {}, { name: string }>,
  res: Response
) => {
  try {
    const { oldName } = req.params;
    const { name: newName } = req.body;

    const products = await productService.updateProduct(oldName, newName);
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


