import { useEffect, useState } from "react";
import type { InventoryItem } from "../types/inventory";
import type { Product } from "../types/product";
import {
  getInventory,
  setInventory as saveInventoryRequest,
  resetInventory as resetInventoryRequest,
} from "../services/inventoryService";

export const useInventory = (products: Product[]) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingItem, setSavingItem] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await getInventory();
        if (!active) return;

        if (!Array.isArray(data)) {
          setInventory([]);
          setStatusMessage("Invalid inventory response.");
          return;
        }

        setInventory(data);
      } catch {
        if (!active) return;
        setStatusMessage("Unable to load inventory.");
        setInventory([]);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const syncWithServer = async (
    updated: InventoryItem[],
    itemName: string
  ) => {
    try {
      setSavingItem(itemName);

      const saved = await saveInventoryRequest(updated);

      if (!Array.isArray(saved)) {
        setStatusMessage("Invalid response from server.");
        return;
      }

      setInventory(saved);
      setStatusMessage(null);
    } catch {
      setStatusMessage("Unable to save inventory.");
    } finally {
      setSavingItem(null);
    }
  };

  const addInventoryItem = async (productName: string, quantity: number) => {
    if (!productName) {
      return { ok: false, message: "Select a product." };
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return { ok: false, message: "Quantity must be positive." };
    }

    const updated = (() => {
      const existing = inventory.find((i) => i.name === productName);
      if (existing) {
        return inventory.map((i) =>
          i.name === productName
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...inventory, { name: productName, quantity }];
    })();

    await syncWithServer(updated, productName);
    return { ok: true };
  };

  const increment = async (name: string) => {
    const updated = inventory.map((i) =>
      i.name === name ? { ...i, quantity: i.quantity + 1 } : i
    );
    await syncWithServer(updated, name);
  };

  const decrement = async (name: string) => {
    const updated = inventory
      .map((i) =>
        i.name === name ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);

    await syncWithServer(updated, name);
  };

  const resetInventory = async () => {
    try {
      setIsResetting(true);

      const cleared = await resetInventoryRequest();

      if (!Array.isArray(cleared)) {
        setInventory([]);
        return;
      }

      setInventory(cleared);
      setStatusMessage(null);
    } catch {
      setStatusMessage("Unable to reset inventory.");
    } finally {
      setIsResetting(false);
    }
  };

  return {
    inventory,
    isLoading,
    savingItem,
    isResetting,
    statusMessage,
    addInventoryItem,
    increment,
    decrement,
    resetInventory,
  };
};
