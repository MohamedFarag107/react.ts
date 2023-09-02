import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiMenu } from "react-icons/hi";
import DashSideBar from "../sidebar/DashSideBar";
import { useLocation, useNavigate } from "react-router-dom";

function DashNav() {
  const {
    t,
    i18n: { language, changeLanguage },
  } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpenDrawer(false);
  }, [pathname]);
  const navigate = useNavigate();
  return (
    <div className="container h-20 w-full flex justify-between items-center ">
      {/* menu */}
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar alt={t("store")} src="/images/logo.png" className="w-12 h-12" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="w-36 flex justify-center items-center capitalize"
          onClick={() => {
            navigate("/dashboard/profile");
            handleClose();
          }}
        >
          {t("profile")}
        </MenuItem>
        <MenuItem
          className="w-36 flex justify-center items-center capitalize"
          onClick={handleClose}
        >
          {t("sign_out")}
        </MenuItem>
      </Menu>
      {/* menu */}
      {/* icons */}{" "}
      <div className="flex justify-center items-start gap-4">
        <Button
          variant="contained"
          sx={{
            minWidth: 0,
          }}
          className=" bg-primary hover:bg-secondary w-12 h-12"
          onClick={() => {
            language === "en" ? changeLanguage("ar") : changeLanguage("en");
          }}
        >
          {language === "en" ? "ع" : "EN"}
        </Button>
        <Button
          variant="contained"
          sx={{
            minWidth: 0,
          }}
          className=" bg-primary hover:bg-secondary w-12 h-12 flex justify-center items-center md:hidden"
          onClick={() => setOpenDrawer(true)}
        >
          <HiMenu />
        </Button>
      </div>
      {/* icons */}
      {/* drawer */}
      <Drawer
        anchor={language === "en" ? "left" : "right"}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        dir={language === "en" ? "ltr" : "rtl"}
      >
        <DashSideBar className="w-[300px]" />
      </Drawer>
      {/* drawer */}
    </div>
  );
}

export default DashNav;
