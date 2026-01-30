import { useState } from "react";
import Spinner from "./ui/Spinner";

interface Props {
  onAdd: (name: string) => Promise<{ ok: boolean; message?: string }>;
}

const ProductForm = ({ onAdd }: Props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    const result = await onAdd(name);

    if (!result.ok) {
      setMessage(result.message ?? "Unable to save product.");
      setIsSaving(false);
      return;
    }

    setName("");
    setMessage(null);
    setIsSaving(false);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-50">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        New product
      </div>

      <label className="mt-4 flex flex-col gap-2 text-sm font-semibold text-slate-600">
        Product name
        <input
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 focus:border-indigo-400 focus:outline-none"
          placeholder="Type product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSaving}
        />
      </label>

      {message ? (
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
          {message}
        </div>
      ) : null}

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-6 flex w-full items-center justify-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 disabled:opacity-50"
      >
        {isSaving ? <Spinner size={18} /> : "Save"}
      </button>
    </div>
  );
};

export default ProductForm;
