import { useEffect, useState } from "react";
import { useGetAllProductsMutation } from "../../../api/product.api";
import CustomPagination from "../../ui/pagination/CustomPagination";
import { Skeleton } from "@mui/material";

function Products() {
  const [getAllProducts, { data, isLoading, isError, isSuccess, error }] =
    useGetAllProductsMutation();
  const [query, setQuery] = useState("?limit=1");
  useEffect(() => {
    const id = setTimeout(() => {
      console.log({ query });

      getAllProducts({ query });
    }, 2000);
    return () => clearTimeout(id);
  }, [query]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data?.pagination?.totalPages || 1);
    }
  }, [data]);
  useEffect(() => {
    if (page === 1) return;
    setQuery(`?limit=1&page=${page}`);
  }, [page]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {isLoading && (
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={210} height={118} />
          ))}
        </div>
      )}
      {(isSuccess || page !== 1 || (page === 1 && data)) && (
        <CustomPagination
          setPage={setPage}
          totalPages={totalPages}
          page={page}
        />
      )}
    </div>
  );
}

export default Products;
