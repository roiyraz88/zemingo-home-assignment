type Route = "inventory" | "product";

interface HeaderProps {
  route: Route;
  onNavigate: (route: Route) => void;
}

const Header = ({ route, onNavigate }: HeaderProps) => {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-500">
          Store control center
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
          Zemingo Inventory Studio
        </h1>
        <p className="mt-2 max-w-xl text-base text-slate-600">
          Add products and build a clean, traceable inventory in seconds.
        </p>
      </div>

      <div className="flex w-full gap-3 md:w-auto">
        <button
          className={`flex-1 rounded-full px-5 py-2 text-sm font-semibold transition ${
            route === "inventory"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
              : "bg-white text-slate-600"
          }`}
          onClick={() => onNavigate("inventory")}
        >
          Inventory
        </button>

        <button
          className={`flex-1 rounded-full px-5 py-2 text-sm font-semibold transition ${
            route === "product"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
              : "bg-white text-slate-600"
          }`}
          onClick={() => onNavigate("product")}
        >
          Products
        </button>
      </div>
    </header>
  );
};

export default Header;
