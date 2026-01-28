import { useState } from "react";
import type { InventoryItem } from "../types/inventory";

interface Props {
  onSubmit: (items: InventoryItem[]) => void;
}

export default function InventoryForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || quantity < 0) return;

    onSubmit([{ name, quantity }]);

    setName("");
    setQuantity(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded space-y-4 bg-white shadow"
    >
      <h2 className="text-lg font-bold">Set Inventory</h2>

      <input
        type="text"
        placeholder="Product name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
