import InventoryForm from "../components/InventoryForm";
import InventoryList from "../components/InventoryList";
import Spinner from "../components/ui/Spinner";
import type { InventoryItem } from "../types/inventory";
import type { Product } from "../types/product";

interface Props {
  products: Product[];
  inventory: InventoryItem[];
  onAddItem: (
    productName: string,
    quantity: number
  ) => Promise<{ ok: boolean; message?: string }>;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  onReset: () => Promise<void>;
  savingItem: string | null;
  isResetting: boolean;
}

const InventoryPage = ({
  products,
  inventory,
  onAddItem,
  onIncrement,
  onDecrement,
  onReset,
  savingItem,
  isResetting,
}: Props) => {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Inventory list
        </h2>
        <p className="mt-1 text-slate-500">
          Add items from your product catalog and keep quantities accurate.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-50">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>Inventory builder</span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600">
            {products.length} products
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <InventoryForm products={products} onAdd={onAddItem} />

          <InventoryList
            items={inventory}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            savingItem={savingItem}
          />

          <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
            <button
              className="rounded-full border border-rose-200 px-6 py-2 text-sm font-semibold text-rose-600 disabled:opacity-50 flex items-center gap-2"
              onClick={onReset}
              disabled={isResetting || savingItem !== null}
            >
              {isResetting && <Spinner size={18} />}
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryPage;
