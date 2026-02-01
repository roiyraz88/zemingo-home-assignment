import { Product } from "../models/Product";
import { InventoryItem } from "../models/InventoryItem";

export const getAllProducts = async () => {
  return await Product.find();
};

export const upsertProduct = async (product: {
  _id?: string;
  name?: string;
}) => {
  const { _id, name } = product;

  if (!name) {
    throw new Error("invalid product, name is missing");
  }

  if (_id) {
    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      throw new Error("product not found");
    }

    const duplicate = await Product.findOne({ name });
    if (duplicate && duplicate._id.toString() !== _id) {
      throw new Error("product name already exists");
    }

    existingProduct.name = name;
    await existingProduct.save();

    return await Product.find();
  }

  const existing = await Product.findOne({ name });
  if (existing) {
    throw new Error("product name already exists");
  }

  await Product.create({ name });
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
