import { CircularProgress } from "@mui/material";
import HomeSubCategory from "./HomeSubCategory";
import { useGetAllSubCategoriesQuery } from "../../../api/subCategory.api";
import { useAppSelector } from "../../../api/store";
import { Fragment } from "react";

const randomIndex = (length: number): number => {
  const randomSlider = Math.floor(Math.random() * length);
  return randomSlider;
};

function HomeSubCategories() {
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllSubCategoriesQuery({
      query: "?sort=-updatedAt",
    });
  const { sliders } = useAppSelector((state) => state.global);
  if (isLoading)
    return (
      <div className="bg-white">
        <div className="container py-9 flex justify-center items-center h-[50vh] select-none">
          <CircularProgress />
        </div>
      </div>
    );
  if (isError && "data" in error) return <div>{error.data.message}</div>;

  if (isSuccess && data) {
    const subCategories = data.data;
    return (
      <div className="bg-white">
        <div className="container py-9 select-none">
          {subCategories.map((subCategory) => (
            <Fragment key={subCategory._id}>
              <HomeSubCategory subCategory={subCategory} />
              <img
                src={sliders[randomIndex(sliders.length)]}
                className="w-full object-center  object-contain max-h-96 my-10"
                alt="slider"
              />
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default HomeSubCategories;
