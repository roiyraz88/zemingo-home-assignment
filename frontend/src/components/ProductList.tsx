import { useState } from "react";
import type { Product } from "../types/product";
import Spinner from "./ui/Spinner";

interface Props {
  products: Product[];
  onRename: (
    product: Product,
    newName: string
  ) => Promise<{ ok: boolean; message?: string }>;
  onDelete: (name: string) => Promise<{ ok: boolean; message?: string }>;
}

const ProductList = ({ products, onRename, onDelete }: Props) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [draftName, setDraftName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string | null>(null);

  const startEdit = (product: Product) => {
    if (savingId || deletingName) return;
    setEditingProduct(product);
    setDraftName(product.name);
    setMessage(null);
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    setSavingId(editingProduct._id);
    const result = await onRename(editingProduct, draftName);

    if (!result.ok) {
      setMessage(result.message ?? "Unable to rename product.");
      setSavingId(null);
      return;
    }

    setEditingProduct(null);
    setDraftName("");
    setMessage(null);
    setSavingId(null);
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
    if (savingId) return;
    setEditingProduct(null);
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
            const isEditing = editingProduct?._id === product._id;
            const isSaving = savingId === product._id;
            const isDeleting = deletingName === product.name;

            return (
              <li
                key={product._id}
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
                        onClick={() => startEdit(product)}
                        disabled={Boolean(deletingName || savingId)}
                      >
                        Edit
                      </button>

                      <button
                        className="flex items-center justify-center rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-xs font-semibold text-rose-500 disabled:opacity-50"
                        type="button"
                        onClick={() => handleDelete(product.name)}
                        disabled={isDeleting || Boolean(savingId)}
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
