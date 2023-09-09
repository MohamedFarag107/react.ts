import { useRef } from "react";

import { Button, Divider } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SubCategory } from "../../../types/subCategory.type";
import { useTranslation } from "react-i18next";
import HomeSubCategoryProducts from "./HomeSubCategoryProducts";
import { Link } from "react-router-dom";

interface HomeSubCategoryProps {
  subCategory: SubCategory;
}

function HomeSubCategory({ subCategory }: HomeSubCategoryProps) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <div>
      <Divider className="relative" textAlign="center">
        <Button
          variant="outlined"
          className="hover:bg-primary hover:text-white absolute min-w-0 h-10 w-10 z-50 flex justify-center items-center bg-white left-0 top-1/2 -translate-y-1/2 border-solid border-gray-100 border rounded-md p-2 cursor-pointer  transition-all"
          ref={navigationNextRef}
        >
          <IoIosArrowBack size={18} />
        </Button>
        <h2 className="text-xl font-bold text-primary capitalize">
          {language === "en" ? subCategory.name_en : subCategory.name_ar}
        </h2>
        <Button
          variant="outlined"
          className="hover:bg-primary hover:text-white absolute min-w-0 h-10 w-10 z-50 flex justify-center items-center bg-white right-0 top-1/2 -translate-y-1/2 border-solid border-gray-100 border rounded-md p-2 cursor-pointer  transition-all"
          ref={navigationPrevRef}
        >
          <IoIosArrowForward size={18} />
        </Button>
      </Divider>
      <HomeSubCategoryProducts
        _id={subCategory._id}
        navigationPrevRef={navigationPrevRef}
        navigationNextRef={navigationNextRef}
      />
      <Divider textAlign="center" color="primary" className="!border-primary">
        <Button variant="outlined" color="primary">
          <Link
            className="decoration-transparent text-primary font-bold capitalize"
            to={`sub-category/products/${subCategory._id}`}
          >
            {t("view_all")}
          </Link>
        </Button>
      </Divider>
    </div>
  );
}

export default HomeSubCategory;
