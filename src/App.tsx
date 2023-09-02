import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/client/Home";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import Private from "./layout/Private";
import Profile from "./pages/client/Profile";
import Guest from "./pages/client/Guest";
import { useTranslation } from "react-i18next";
import Category from "./pages/client/Category";
import Cart from "./pages/client/Cart";
import Wishlist from "./pages/client/Wishlist";
import DashLayout from "./layout/DashLayout";
import DashHome from "./pages/dash/home/DashHome";
import DashOrders from "./pages/dash/orders/DashOrders";
import DashProducts from "./pages/dash/products/DashProducts";
import DashCategories from "./pages/dash/categories/DashCategories";
import DashSubCategories from "./pages/dash/subcategories/DashSubCategories";
import DashBrands from "./pages/dash/brands/DashBrands";
import DashInstalments from "./pages/dash/instalments/DashInstalments";
import DashSliders from "./pages/dash/sliders/DashSliders";
import DashProfile from "./pages/dash/profile/DashProfile";
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
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}

export default App;
