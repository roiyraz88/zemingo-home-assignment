import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import {
  addProduct as addProductRequest,
  getProducts,
  updateProduct as updateProductRequest,
  deleteProduct as deleteProductRequest,
} from "../services/productService";
import { normalizeName } from "../utils/normalizeName";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const productNames = useMemo(
    () => new Set(products.map((p) => p.name.toLowerCase())),
    [products]
  );

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const data = await getProducts();
        if (!active) return;
        setProducts(data);
      } catch {
        if (!active) return;
        setStatusMessage("Unable to load products.");
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, []);

  const refreshProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch {
      setStatusMessage("Unable to refresh products.");
    }
  };

  const addProduct = async (name: string) => {
    const trimmed = normalizeName(name);

    if (!trimmed) {
      return { ok: false, message: "Product name is required." };
    }

    if (productNames.has(trimmed.toLowerCase())) {
      return { ok: false, message: "Product already exists." };
    }

    try {
      const updated = await addProductRequest(trimmed);
      setProducts(updated);
      setStatusMessage(null);
      return { ok: true };
    } catch {
      return { ok: false, message: "Unable to save product." };
    }
  };

  const renameProduct = async (oldName: string, newName: string) => {
    const trimmed = normalizeName(newName);

    if (!trimmed) {
      return { ok: false, message: "Product name is required." };
    }

    // לא באמת שינוי → הצלחה
    if (oldName.toLowerCase() === trimmed.toLowerCase()) {
      return { ok: true };
    }

    if (productNames.has(trimmed.toLowerCase())) {
      return { ok: false, message: "Product already exists." };
    }

    try {
      const updated = await updateProductRequest(oldName, trimmed);
      setProducts(updated);
      setStatusMessage(null);
      return { ok: true };
    } catch {
      return { ok: false, message: "Unable to rename product." };
    }
  };

  const deleteProduct = async (name: string) => {
    try {
      const updated = await deleteProductRequest(name);
      setProducts(updated);
      setStatusMessage(null);
      return { ok: true };
    } catch {
      return { ok: false, message: "Unable to delete product." };
    }
  };

  return {
    products,
    isLoading,
    statusMessage,
    addProduct,
    renameProduct,
    deleteProduct,
  };
};
