import { Outlet } from "react-router-dom";
import NavBar from "../components/client/navbar/NavBar";
import Footer from "../components/client/footer/Footer";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function Layout() {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("store");
  }, [t]);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
