import { Product } from "../models/Product";

export const getAllProducts = async () => {
  return await Product.find();
};

export const addProduct = async (name: string) => {
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
