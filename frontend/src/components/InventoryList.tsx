import type { InventoryItem } from "../types/inventory";

interface Props {
  items: InventoryItem[];
}

export default function InventoryList({ items }: Props) {
  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Inventory</h2>

      {items.length === 0 ? (
        <p className="text-gray-500">No inventory</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex justify-between border-b pb-1"
            >
              <span>{item.name}</span>
              <span className="font-semibold">{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
