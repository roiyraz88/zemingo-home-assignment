import type { Product } from "../types/product";
import apiClient from "./apiClient";

export const getProducts = async (): Promise<Product[]> => {
  const res = await apiClient.get<Product[]>("/api/product/all");
  return res.data;
};

export async function addProduct(name: string): Promise<Product[]> {
  const res = await apiClient.post<Product[]>("/api/product", { name });
  return res.data;
}

export async function updateProduct(
  oldName: string,
  newName: string
): Promise<Product[]> {
  const res = await apiClient.put<Product[]>(
    `/api/product/${encodeURIComponent(oldName)}`,
    { name: newName }
  );
  return res.data;
}

export async function deleteProduct(name: string): Promise<Product[]> {
  const res = await apiClient.delete<Product[]>(
    `/api/product/${encodeURIComponent(name)}`
  );
  return res.data;
}
