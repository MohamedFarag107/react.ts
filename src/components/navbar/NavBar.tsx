import {
  Badge,
  BadgeProps,
  Button,
  Menu,
  MenuItem,
  Skeleton,
  styled,
} from "@mui/material";
import { useAppSelector, useGetAllCategoriesQuery } from "../../api";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMenu, HiShoppingCart } from "react-icons/hi";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { useState } from "react";
import clsx from "clsx";
import ApiRender from "../ui/api/ApiRender";
import { useNavigate } from "react-router-dom";
import { useGetMyCartQuery } from "../../api/cart.api";

const CategoryMenu = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetAllCategoriesQuery({ query: "?sort=createdAt" });
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setOpen((prev) => !prev);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (id: string) => {
    setOpen((prev) => !prev);
    if (typeof id === "string") {
      navigate(`/category/${id}`);
    }
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        className="h-full grid grid-cols-3 place-items-center gap-2 rounded-none bg-primary hover:bg-secondary"
        variant="contained"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className="col-span-2">{t("categories")}</span>
        <MdKeyboardArrowDown
          size={20}
          className={clsx(open && "rotate-180", "transition-all")}
        />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <ApiRender
          status={{
            isLoading,
            isError,
            isSuccess,
            isEmpty: data?.data.length === 0,
          }}
          success={data?.data.map((category) => (
            <MenuItem
              onClick={() => handleClose(category._id)}
              key={category._id}
            >
              {language === "en" ? category.name_en : category.name_ar}
            </MenuItem>
          ))}
          error={
            <MenuItem className="text-red-600">{t("category_error")}</MenuItem>
          }
          loading={Array.from({ length: 3 }).map((_, i) => (
            <MenuItem key={i}>
              <Skeleton variant="rounded" width={100} height={40} />
            </MenuItem>
          ))}
          empty={<MenuItem>no categories...</MenuItem>}
        />
      </Menu>
    </>
  );
};
const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    left: 10,
    top: -2,
  },
}));

const NavIcons = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetMyCartQuery({
    query: "?sort=createdAt",
  });
  const navigate = useNavigate();
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  return (
    <>
      <div className="icons h-10 grid grid-cols-3 md:grid-cols-4 gap-2">
        <Button
          variant="contained"
          className="p-0 !w-10 !h-10 text-white rounded-none flex justify-center items-center bg-primary hover:bg-secondary"
          onClick={() => navigate("/cart")}
        >
          <StyledBadge showZero badgeContent={isSuccess ? data.data.length : 0}>
            <HiShoppingCart className="h-5 w-5" />
          </StyledBadge>
        </Button>
        <Button
          variant="contained"
          className="p-0 !w-10 !h-10 text-white rounded-none flex justify-center items-center bg-primary hover:bg-secondary"
          onClick={() => navigate("/wishlist")}
        >
          <StyledBadge badgeContent={4}>
            <FaHeart className="h-5 w-5" />
          </StyledBadge>
        </Button>
        <Button
          variant="contained"
          className="p-0 text-white rounded-none !h-10 !w-10 hidden md:flex justify-center items-center  bg-primary hover:bg-secondary"
        >
          <FaUserAlt />
        </Button>
        <Button
          variant="contained"
          className="p-0 text-white rounded-none !h-10 !w-10 hidden md:flex justify-center items-center  bg-primary hover:bg-secondary"
          onClick={() => {
            language === "en" ? changeLanguage("ar") : changeLanguage("en");
          }}
        >
          {language === "en" ? "ع" : "EN"}
        </Button>
        <Button
          variant="contained"
          className="p-0 text-white rounded-none !h-10 !w-10  flex md:hidden justify-center items-center  bg-primary hover:bg-secondary"
          onClick={() => {}}
        >
          <HiMenu />
        </Button>
      </div>
    </>
  );
};

function NavBar() {
  const { logo, name_ar, name_en } = useAppSelector((state) => state.global);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <header className="h-20 flex justify-center items-center bg-white">
      <nav className="container flex justify-between items-center">
        <div className="flex items-center gap-9">
          <img
            className="h-[70px] w-[70px] object-contain"
            src={logo}
            alt={`${name_en} - ${name_ar}`}
          />
          <div className="hidden md:flex gap-5 items-center h-10">
            <Button
              className="h-full rounded-none bg-primary hover:bg-secondary"
              variant="contained"
              onClick={() => navigate("/")}
            >
              {t("home")}
            </Button>
            <CategoryMenu />
          </div>
        </div>
        {/* icons */}
        <NavIcons />
      </nav>
    </header>
  );
}

export default NavBar;
