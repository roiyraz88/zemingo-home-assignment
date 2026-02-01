import type { Product } from "../types/product";
import apiClient from "./apiClient";

export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<Product[]>("/product/all");
  return res.data;
};

export const saveProduct = async (product: {
  _id?: string;
  name: string;
}): Promise<Product[]> => {
  const res = await apiClient.put<Product[]>("/product", product);
  return res.data;
};

export async function deleteProduct(name: string): Promise<Product[]> {
  const res = await apiClient.delete<Product[]>(
    `/product/${encodeURIComponent(name)}`
  );
  return res.data;
}
