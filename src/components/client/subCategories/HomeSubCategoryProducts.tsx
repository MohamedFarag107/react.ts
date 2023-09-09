import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetAllProductsQuery } from "../../../api/product.api";
import { Button, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Product } from "../../../types/product.type";
import {
  useGetMyCartQuery,
  useToggleCartMutation,
} from "../../../api/cart.api";
import { BsFillCartCheckFill, BsFillCartFill } from "react-icons/bs";

function HomeSubCategoryProductsLoadingSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border-solid border-gray-100 border rounded-md shadow-sm relative px-3 py-3">
      <Skeleton variant="rectangular" width="100%" height={253} />
      <Skeleton variant="rectangular" width="60%" height={10} />
      <Skeleton variant="rectangular" width="40%" height={10} />
    </div>
  );
}

function HomeSubCategoryProductsLoading() {
  return (
    <Swiper
      spaceBetween={50}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },

        1280: {
          slidesPerView: 5,
          spaceBetween: 50,
        },
      }}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <SwiperSlide key={index}>
          <HomeSubCategoryProductsLoadingSkeleton />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function HomeSubCategoryProductsNotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-danger capitalize">
        {t("no_data")}
      </h2>
    </div>
  );
}
function HomeSubCategoryProductsInternetError() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold text-danger capitalize">
        {t("internet_error")}
      </h2>
    </div>
  );
}
interface HomeSubCategoryProductProps {
  product: Product;
}
function HomeSubCategoryProduct({ product }: HomeSubCategoryProductProps) {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const {
    data,
    isSuccess,
    isLoading: cartLoading,
  } = useGetMyCartQuery({
    query: "?sort=createdAt&limit=100",
  });

  const [toggleCart, { isLoading }] = useToggleCartMutation();

  return (
    <div className=" p-5">
      <div className="group border-solid border-gray-100 border rounded-md shadow-sm relative">
        <Link
          to={`/product/${product._id}`}
          className="!text-primary decoration-transparent flex flex-col justify-center items-center gap-2"
        >
          <img
            loading="lazy"
            className="w-[200px] object-contain aspect-square"
            src={product.images[0]}
            alt="product image"
          />
          <h3 className="group-hover:text-primary transition-all text-center pt-2 m-0 mb-2 text-sm text-gray-600 font-normal line-clamp-2">
            {language === "en" ? product.name_en : product.name_ar}
          </h3>
        </Link>
        <div className="pb-4">
          {product.discount > 0 ? (
            <div className="flex justify-evenly items-center py-3 text-xl font-bold">
              <span className="text-sm text-gray-500 line-through">
                {product.price} {t("SAR")}
              </span>
              <span className="text-sm text-red-500">
                {product.finalPrice} {t("SAR")}
              </span>
            </div>
          ) : (
            <span className="text-base block text-center py-3 text-primary">
              {product.finalPrice} {t("SAR")}
            </span>
          )}
        </div>
        <Button
          variant="contained"
          color={
            (isSuccess &&
              data.data.some(
                (item) =>
                  typeof item.product === "string" &&
                  item.product === product._id
              )) ||
            false
              ? "error"
              : "primary"
          }
          className="min-w-0 w-10 h-10 rounded-full absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 p-0 flex justify-center items-center"
          onClick={() => toggleCart({ product: product._id, quantity: 1 })}
          disabled={isLoading || cartLoading}
        >
          {(isSuccess &&
            data.data.some(
              (item) =>
                typeof item.product === "string" && item.product === product._id
            )) ||
          false ? (
            <BsFillCartCheckFill size={20} />
          ) : (
            <BsFillCartFill size={20} />
          )}
        </Button>
      </div>
    </div>
  );
}

interface HomeSubCategoryProductsProps {
  _id: string;
  navigationPrevRef?: React.MutableRefObject<HTMLButtonElement | null>;
  navigationNextRef?: React.MutableRefObject<HTMLButtonElement | null>;
}
function HomeSubCategoryProducts({
  _id,
  navigationNextRef,
  navigationPrevRef,
}: HomeSubCategoryProductsProps) {
  const { data, isSuccess, isLoading, isError, error } = useGetAllProductsQuery(
    {
      query: `?subCategory=${_id}&sort=-updatedAt`,
    }
  );
  if (isLoading) {
    return (
      <div className="py-10">
        <HomeSubCategoryProductsLoading />
      </div>
    );
  }
  if (isError && "data" in error) {
    return (
      <div className="py-10">
        <HomeSubCategoryProductsNotFound />
      </div>
    );
  }
  if (isSuccess && data) {
    return (
      <div className="pt-5 pb-10">
        <Swiper
          spaceBetween={50}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: navigationPrevRef?.current,
            nextEl: navigationNextRef?.current,
          }}
          onBeforeInit={(swiper) => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation !== "boolean"
            ) {
              swiper.params.navigation.prevEl = navigationPrevRef?.current;
              swiper.params.navigation.nextEl = navigationNextRef?.current;
            }
          }}
          breakpoints={{
            200: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1.8,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 50,
            },

            1280: {
              slidesPerView: 4.5,
              spaceBetween: 50,
            },
          }}
        >
          {data.data.map((product) => (
            <SwiperSlide key={product._id}>
              <HomeSubCategoryProduct product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="py-10">
      <HomeSubCategoryProductsInternetError />
    </div>
  );
}

export default HomeSubCategoryProducts;
