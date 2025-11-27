import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

// Lazy loaded pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function Layout({ products, setProducts }) {
  const { user } = useAuth();
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/register";

  if (user?.email === "admin@meegamart.com" && location.pathname === "/login")
    return <Navigate to="/admin" />;

  return (
    <>
      {!hideLayout && <NavBar />}
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home productsUpdated={products} />} />
          <Route path="/shop" element={<Shop productsUpdated={products} />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard onProductsUpdate={() => setProducts([...products])} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer position="top-right" autoClose={1000} theme="light" />
        <Layout products={products} setProducts={setProducts} />
      </Router>
    </Suspense>
  );
}

export default App;
