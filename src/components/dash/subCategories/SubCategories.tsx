import { useEffect, useState } from "react";
import CustomPagination from "../../ui/pagination/CustomPagination";
import InternetError from "../../ui/error/InternetError"; 
import { useGetAllSubCategoriesQuery } from "../../../api/subCategory.api";
import SubCategoryCard, { SubCategoryCardSkeleton } from "./SubCategoryCard";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col gap-4 justify-start items-center">
    {children}
  </div>
);

function SubCategories() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllSubCategoriesQuery({ query: `?page=${page}` });

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data?.pagination?.totalPages || 1);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <SubCategoryCardSkeleton key={i} />
          ))}
        </div>
      </Layout>
    );
  }

  if (isError && error && "data" in error) {
    return (
      <Layout>
        <p className="text-red-600">{error.data.message}</p>
      </Layout>
    );
  }

  if (isSuccess && data) {
    const subCategories = data.data;
    return (
      <Layout>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {subCategories.map((subCategory) => (
            <SubCategoryCard key={subCategory._id} subCategory={subCategory} />
          ))}
        </div>
        <CustomPagination
          setPage={setPage}
          totalPages={totalPages}
          page={page}
        />
      </Layout>
    );
  }

  return <InternetError name="subcategories" />;
}

export default SubCategories;
