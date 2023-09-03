import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../api/product.api";
import CustomPagination from "../../ui/pagination/CustomPagination";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import InternetError from "../../ui/error/InternetError";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col gap-4 justify-start items-center">
    {children}
  </div>
);

function Products() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess, error } = useGetAllProductsQuery(
    { query: `?page=${page}` }
  );

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data?.pagination?.totalPages || 1);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
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
    const products = data.data;
    return (
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
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

  return <InternetError name="products" />;
}

export default Products;
