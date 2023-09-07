import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { Suspense } from "react";
import Layout from "./layout/Layout";
import DashLayout from "./layout/DashLayout";
import Private from "./layout/Private";
import NotFound from "./pages/NotFound";
import Loading from "./pages/Loading";
// ----------------- Client -----------------
import Home from "./pages/client/Home";
import Profile from "./pages/client/Profile";
import Guest from "./pages/client/Guest";
import Category from "./pages/client/Category";
import Cart from "./pages/client/Cart";
import Wishlist from "./pages/client/Wishlist";
// ----------------- Client -----------------
// ----------------- Dashboard -----------------
import DashHome from "./pages/dash/home/DashHome";
import DashOrders from "./pages/dash/orders/DashOrders";
const DashProducts = React.lazy(() => import("./pages/dash/products/DashProducts"));
const DashCategories = React.lazy(() => import("./pages/dash/categories/DashCategories"));
const DashSubCategories = React.lazy(() => import("./pages/dash/subcategories/DashSubCategories"));
const DashBrands = React.lazy(() => import("./pages/dash/brands/DashBrands"));
const DashInstalments = React.lazy(() => import("./pages/dash/instalments/DashInstalments"));
const DashSliders = React.lazy(() => import("./pages/dash/sliders/DashSliders"));
const DashProfile = React.lazy(() => import("./pages/dash/profile/DashProfile"));
// ----------------- Dashboard -----------------
import { Toaster } from "react-hot-toast";

function App() {
  const { i18n } = useTranslation();

  return (
    <main dir={i18n.language === "en" ? "ltr" : "rtl"}>
      <Toaster
        position={"top-left"}
        toastOptions={{
          duration: 3000,
        }}
      />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Create Guest */}
          <Route element={<Guest />}>
            {/* public */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/category/:id" element={<Category />} />
              {/* private */}
              <Route element={<Private role={["user", "guest", "admin"]} />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
            {/* dashboard */}
            <Route path="/dashboard" element={<Private role={["admin"]} />}>
              <Route element={<DashLayout />}>
                <Route index element={<DashHome />} />
                <Route path="orders" element={<DashOrders />} />
                <Route path="products" element={<DashProducts />} />
                <Route path="categories" element={<DashCategories />} />
                <Route path="subcategories" element={<DashSubCategories />} />
                <Route path="instalments" element={<DashInstalments />} />
                <Route path="sliders" element={<DashSliders />} />
                <Route path="brands" element={<DashBrands />} />
                <Route path="profile" element={<DashProfile />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
