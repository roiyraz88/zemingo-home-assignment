import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import Spinner from "./ui/Spinner";

interface Props {
  products: Product[];
  onAdd: (
    productName: string,
    quantity: number
  ) => Promise<{ ok: boolean; message?: string }>;
}

const InventoryForm = ({ products, onAdd }: Props) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState<string>("1");
  const [message, setMessage] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false); 

  useEffect(() => {
    if (!products.length) {
      setSelectedProduct("");
      return;
    }
    if (!selectedProduct) {
      setSelectedProduct(products[0].name);
    }
  }, [products, selectedProduct]);

  const handleAdd = async () => {
    if (isAdding) return; 

    setIsAdding(true);

    const parsedQuantity = Number(quantity);
    const result = await onAdd(selectedProduct, parsedQuantity);

    if (!result.ok) {
      setMessage(result.message ?? "Unable to add item.");
      setIsAdding(false);
      return;
    }

    setMessage(null);
    setQuantity("1");
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_140px_auto] md:items-end">
        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Product name
          <select
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 focus:border-indigo-400 focus:outline-none"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            disabled={!products.length || isAdding}
          >
            {products.length === 0 ? (
              <option value="">No products yet</option>
            ) : (
              products.map((product) => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
          Quantity
          <input
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 focus:border-indigo-400 focus:outline-none"
            type="number"
            min={1}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={isAdding}
          />
        </label>

        <button
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-semibold text-white shadow-lg shadow-indigo-200 disabled:opacity-50"
          type="button"
          onClick={handleAdd}
          disabled={!products.length || isAdding}
        >
          {isAdding ? <Spinner size={20} /> : "+"}
        </button>
      </div>

      {message ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
          {message}
        </div>
      ) : null}
    </div>
  );
};

export default InventoryForm;
