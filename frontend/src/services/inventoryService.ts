import type { InventoryItem } from "../types/inventory";
import apiClient from "./apiClient";

export const getInventory = async (): Promise<InventoryItem[]> => {
  const res = await apiClient.get<InventoryItem[]>("/api/inventory");
  return res.data;
};

export const setInventory = async (
  items: InventoryItem[]
): Promise<InventoryItem[]> => {
  const res = await apiClient.post<InventoryItem[]>("/api/inventory", items);
  return res.data;
};

export const resetInventory = async (): Promise<InventoryItem[]> => {
  const res = await apiClient.post<InventoryItem[]>("/api/inventory/reset");
  return res.data;
};
