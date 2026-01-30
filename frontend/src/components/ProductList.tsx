import { useState } from "react";
import type { Product } from "../types/product";
import Spinner from "./ui/Spinner";

interface Props {
  products: Product[];
  onRename: (
    oldName: string,
    newName: string
  ) => Promise<{ ok: boolean; message?: string }>;
  onDelete: (name: string) => Promise<{ ok: boolean; message?: string }>;
}

const ProductList = ({ products, onRename, onDelete }: Props) => {
  const [editingName, setEditingName] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const [savingName, setSavingName] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const startEdit = (name: string) => {
    if (savingName || deletingName) return;
    setEditingName(name);
    setDraftName(name);
    setMessage(null);
  };

  const handleSave = async () => {
    if (!editingName) return;

    setSavingName(editingName);
    const result = await onRename(editingName, draftName);

    if (!result.ok) {
      setMessage(result.message ?? "Unable to rename product.");
      setSavingName(null);
      return;
    }

    setEditingName(null);
    setDraftName("");
    setMessage(null);
    setSavingName(null);
  };

  const handleDelete = async (name: string) => {
    setDeletingName(name);

    const result = await onDelete(name);
    if (!result.ok) {
      setMessage(result.message ?? "Unable to delete product.");
    }

    setDeletingName(null);
  };

  const handleCancel = () => {
    if (savingName) return;
    setEditingName(null);
    setDraftName("");
    setMessage(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-50">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        <span>Products list</span>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] text-indigo-600">
          {products.length} items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-400">
          No products yet.
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {products.map((product) => {
            const isEditing = editingName === product.name;
            const isSaving = savingName === product.name;
            const isDeleting = deletingName === product.name;

            return (
              <li
                key={product.name}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                {isEditing ? (
                  <input
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    disabled={isSaving}
                  />
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Available for inventory selection
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        className="flex items-center justify-center rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                      >
                        {isSaving ? <Spinner size={14} /> : "Save"}
                      </button>

                      <button
                        className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-500 disabled:opacity-50"
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-500 disabled:opacity-50"
                        type="button"
                        onClick={() => startEdit(product.name)}
                        disabled={Boolean(deletingName || savingName)}
                      >
                        Edit
                      </button>

                      <button
                        className="flex items-center justify-center rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-500 disabled:opacity-50"
                        type="button"
                        onClick={() => handleDelete(product.name)}
                        disabled={isDeleting || Boolean(savingName)}
                      >
                        {isDeleting ? <Spinner size={14} /> : "Delete"}
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {message ? (
        <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600">
          {message}
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
