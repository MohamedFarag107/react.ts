import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";
import Loading from "./pages/Loading";
import Private from "./layout/Private";
import Profile from "./pages/Profile";
import Guest from "./pages/Guest";
import { useTranslation } from "react-i18next";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  const { i18n } = useTranslation();
  return (
    <main dir={i18n.language === "en" ? "ltr" : "rtl"}>
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
              <Route element={<Private />}>
                <Route path="/profile" element={<Profile />} />
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
