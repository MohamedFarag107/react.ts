import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../api/store";
import { Button, Divider } from "@mui/material";

import { NavLink } from "react-router-dom";
import React from "react";
const LINKS = [
  {
    path: "/dashboard/orders",
    name: "orders",
  },
  {
    path: "/dashboard/products",
    name: "products",
  },
  {
    path: "/dashboard/categories",
    name: "categories",
  },
  {
    path: "/dashboard/subcategories",
    name: "subcategories",
  },
  {
    path: "/dashboard/brands",
    name: "brands",
  },
  {
    path: "/dashboard/sliders",
    name: "slider",
  },
  {
    path: "/dashboard/instalments",
    name: "instalments",
  },
];

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) =>
      `${props.className} ${isActive ? props.activeClassName : ""}`
    }
  >
    {props.children}
  </NavLink>
));

function DashSideBar({ className = "" }) {
  const { t } = useTranslation();
  const { logo } = useAppSelector((state) => state.global);
  const links = LINKS.map(({ name, path }) => ({
    path,
    name: t(name),
  }));
  return (
    <div className={`h-full w-fill bg-white ${className}`}>
      <div className="container sticky top-0">
        <div className="pt-10 pb-5 flex flex-col items-center justify-center">
          <Button
            component={NavLink}
            to={"/dashboard"}
            className="w-full flex flex-col justify-center items-center gap-3 text-2xl font-bold text-primary uppercase"
          >
            <img src={logo} alt={t("store")} className="w-20 h-20" />
            {t("dash")}
          </Button>
        </div>
        <Divider className="bg-primary" />
        {/* links */}
        <div className="flex flex-col gap-2 pt-4">
          {links.map((link) => (
            <Button
              key={link.path}
              component={MyNavLink}
              to={link.path}
              className="w-full justify-start text-primary capitalize"
              activeClassName={
                "text-white bg-primary hover:text-white hover:bg-primary"
              }
            >
              {link.name}
            </Button>
          ))}
        </div>
        {/* links */}
      </div>
    </div>
  );
}

export default DashSideBar;
