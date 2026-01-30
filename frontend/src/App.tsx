import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import InventoryPage from "./pages/InventoryPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/ui/Header";
import Loader from "./components/ui/Loader";
import StatusMessage from "./components/ui/StatusMessage";
import { useProducts } from "./hooks/useProducts";
import { useInventory } from "./hooks/useInventory";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    products,
    isLoading: productsLoading,
    statusMessage: productsStatus,
    addProduct,
    renameProduct,
    deleteProduct,
  } = useProducts();

  const {
    inventory,
    isLoading: inventoryLoading,
    savingItem,
    isResetting,
    statusMessage: inventoryStatus,
    addInventoryItem,
    increment,
    decrement,
    resetInventory,
  } = useInventory(products);

  const isLoading = productsLoading || inventoryLoading;
  const statusMessage = productsStatus || inventoryStatus;

  const currentRoute =
    location.pathname === "/product" ? "product" : "inventory";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        <Header
          route={currentRoute}
          onNavigate={(route) =>
            navigate(route === "product" ? "/product" : "/inventory")
          }
        />

        {statusMessage && <StatusMessage message={statusMessage} />}

        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/inventory" replace />} />

            <Route
              path="/inventory"
              element={
                <InventoryPage
                  products={products}
                  inventory={inventory}
                  onAddItem={addInventoryItem}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onReset={resetInventory}
                  savingItem={savingItem}
                  isResetting={isResetting}
                />
              }
            />

            <Route
              path="/product"
              element={
                <ProductsPage
                  products={products}
                  onAddProduct={addProduct}
                  onRenameProduct={renameProduct}
                  onDeleteProduct={deleteProduct}
                  onNavigateInventory={() => navigate("/inventory")}
                />
              }
            />

            <Route path="*" element={<Navigate to="/inventory" replace />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
