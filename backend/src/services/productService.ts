import { Product } from "../models/Product";
import { ProductType } from "../types/product";
import { InventoryItem } from "../models/InventoryItem";

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

export const updateProduct = async (oldName: string, newName: string) => {
  if (!newName) {
    throw new Error("invalid product, name is missing");
  }

  const product = await Product.findOne({ name: oldName });
  if (!product) {
    throw new Error("product not found");
  }

  const existing = await Product.findOne({ name: newName });
  if (existing) {
    throw new Error("product name already exists");
  }

  product.name = newName;
  await product.save();

  return await Product.find();
};

export const deleteProduct = async (name: string) => {
  const existing = await Product.findOne({ name });
  if (!existing) {
    throw new Error("product not found");
  }

  await Product.deleteOne({ name });
  await InventoryItem.deleteMany({ name });
  return await Product.find();
};
