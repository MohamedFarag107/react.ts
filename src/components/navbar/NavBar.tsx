import { Button } from "@mui/material";
import { useAppSelector } from "../../api";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { logo, name_ar, name_en } = useAppSelector((state) => state.global);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <header
      dir={language === "en" ? "ltr" : "rtl"}
      className="h-20 flex justify-center items-center bg-white"
    >
      <nav className="container flex justify-between items-center">
        <div className="flex items-center gap-9">
          <img
            className="h-[70px] w-[70px] object-contain"
            src={logo}
            alt={`${name_en} - ${name_ar}`}
          />
          <div className="flex gap-5 items-center !h-full">
            <Button className="!h-full" variant="contained">
              {t("home")}
            </Button>
            <Button className="!h-full" variant="contained">
              {t("home")}
            </Button>
            <Button className="!h-full" variant="contained">
              {t("home")}
            </Button>
          </div>
        </div>
        {/* icons */}
        <div className="icons"></div>
      </nav>
    </header>
  );
}

export default NavBar;
