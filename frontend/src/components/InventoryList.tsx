import type { InventoryItem } from "../types/inventory";
import Spinner from "./ui/Spinner";

interface Props {
  items: InventoryItem[];
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  savingItem: string | null;
}

const InventoryList = ({
  items,
  onIncrement,
  onDecrement,
  savingItem,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>Items</span>
        <span className="text-slate-400">{items.length} total</span>
      </div>

      {items.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-400">
          Inventory is empty.
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => {
            const isSavingThisItem = savingItem === item.name;

            return (
              <li
                key={item.name}
                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">Quantity</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onDecrement(item.name)}
                    disabled={isSavingThisItem}
                    className="h-8 w-8 rounded-full border border-slate-300 text-lg font-semibold text-slate-600 disabled:opacity-50"
                  >
                    −
                  </button>

                  {isSavingThisItem ? (
                    <Spinner />
                  ) : (
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                  )}

                  <button
                    onClick={() => onIncrement(item.name)}
                    disabled={isSavingThisItem}
                    className="h-8 w-8 rounded-full bg-indigo-600 text-lg font-semibold text-white disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default InventoryList;
