import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

export default function ProductForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="border p-2"
        placeholder="product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(name);
          setName("");
        }}
        className="bg-blue-500 text-white px-4 py-2"
      >
        save
      </button>
    </div>
  );
}
