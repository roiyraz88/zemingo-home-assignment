import type { Product } from "../types/product";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <ul className="border w-64 p-2">
      {products.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}
