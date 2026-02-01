import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/product";
import {
  getProducts,
  saveProduct,
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

  const addProduct = async (name: string) => {
    const trimmed = normalizeName(name);

    if (!trimmed) {
      return { ok: false, message: "Product name is required." };
    }

    if (productNames.has(trimmed.toLowerCase())) {
      return { ok: false, message: "Product already exists." };
    }

    try {
      const updated = await saveProduct({ name: trimmed });
      setProducts(updated);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, message: err.response?.data?.error ?? "Save failed" };
    }
  };

  const renameProduct = async (product: Product, newName: string) => {
    const trimmed = normalizeName(newName);

    if (!trimmed) {
      return { ok: false, message: "Product name is required." };
    }

    if (product.name.toLowerCase() === trimmed.toLowerCase()) {
      return { ok: true };
    }

    if (productNames.has(trimmed.toLowerCase())) {
      return { ok: false, message: "Product already exists." };
    }

    try {
      const updated = await saveProduct({
        _id: product._id,
        name: trimmed,
      });
      setProducts(updated);
      return { ok: true };
    } catch (err: any) {
      return { ok: false, message: err.response?.data?.error ?? "Update failed" };
    }
  };

  const deleteProduct = async (name: string) => {
    try {
      const updated = await deleteProductRequest(name);
      setProducts(updated);
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
