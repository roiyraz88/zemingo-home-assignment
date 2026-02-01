import type { InventoryItem } from "../types/inventory";
import apiClient from "./apiClient";

export const getInventory = async (): Promise<InventoryItem[]> => {
  const res = await apiClient.get<InventoryItem[]>("/inventory");
  return res.data;
};

export const setInventory = async (
  items: InventoryItem[]
): Promise<InventoryItem[]> => {
  const res = await apiClient.post<InventoryItem[]>("/inventory", items);
  return res.data;
};

export const resetInventory = async (): Promise<InventoryItem[]> => {
  const res = await apiClient.post<InventoryItem[]>("/inventory/reset");
  return res.data;
};
