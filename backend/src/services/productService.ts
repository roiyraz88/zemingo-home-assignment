import { Product } from "../models/Product";
import { ProductType } from "../types/product";

export const getAllProducts = async () => {
  return await Product.find();
};

export const addProduct = async (product: ProductType) => {
  const { name } = product;

  if (!name) {
    throw new Error("invalid product, name is missing");
  }

  const existing = await Product.findOne({ name });
  if (existing) {
    throw new Error("product name already exists");
  }

  await Product.create({ name });
  return await Product.find();
};
