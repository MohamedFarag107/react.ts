import { useEffect, useState } from "react";
import CustomPagination from "../../ui/pagination/CustomPagination";
import InternetError from "../../ui/error/InternetError";
import { useGetAllCategoriesQuery } from "../../../api/category.api";
import CategoryCard, { CategoryCardSkeleton } from "./CategoryCard";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col gap-4 justify-start items-center">
    {children}
  </div>
);

function Categories() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess, error } =
    useGetAllCategoriesQuery({ query: `?sort=-updatedAt&page=${page}` });

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
            <CategoryCardSkeleton key={i} />
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
    const categories = data.data;
    return (
      <Layout>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
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

  return <InternetError name="categories" />;
}

export default Categories;
