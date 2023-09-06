import { Outlet } from "react-router-dom";
import DashSideBar from "../components/dash/sidebar/DashSideBar";
import DashNav from "../components/dash/navbar/DashNav";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DashLayout() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = t("dash");
  }, [i18n.language]);

  return (
    <>
      <div className="flex flex-col">
        <div className="bg-white">
          <DashNav />
        </div>
        <div className="min-h-screen flex flex-row">
          <div className="min-h-screen hidden md:w-[300px] md:block">
            <DashSideBar />
          </div>
          <div className="p-4 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashLayout;
