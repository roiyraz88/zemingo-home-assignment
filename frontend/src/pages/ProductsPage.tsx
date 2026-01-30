import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import type { Product } from "../types/product";

interface Props {
  products: Product[];
  onAddProduct: (name: string) => Promise<{ ok: boolean; message?: string }>;
  onRenameProduct: (
    oldName: string,
    newName: string
  ) => Promise<{ ok: boolean; message?: string }>;
  onDeleteProduct: (name: string) => Promise<{ ok: boolean; message?: string }>;
  onNavigateInventory: () => void;
}

const ProductsPage = ({
  products,
  onAddProduct,
  onRenameProduct,
  onDeleteProduct,
  onNavigateInventory,
}: Props) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Product studio
          </h2>
          <p className="mt-1 text-slate-500">
            Add, rename, or remove products from your catalog.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <ProductForm onAdd={onAddProduct} />
        <ProductList
          products={products}
          onRename={onRenameProduct}
          onDelete={onDeleteProduct}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
