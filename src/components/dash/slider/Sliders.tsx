import { useEffect, useState } from "react";
import CustomPagination from "../../ui/pagination/CustomPagination";
import InternetError from "../../ui/error/InternetError";
import { useGetAllSlidersQuery } from "../../../api/slider.api";
import SliderCard, { SliderCardSkeleton } from "./SliderCard";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <div className="flex flex-col gap-4 justify-start items-center">
    {children}
  </div>
);

function Sliders() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isSuccess, error } = useGetAllSlidersQuery({
    query: `?sort=-updatedAt&page=${page}`,
  });

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data?.pagination?.totalPages || 1);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Layout>
        <div className="grid grid-cols-1 gap-4 w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <SliderCardSkeleton key={i} />
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
    const sliders = data.data;
    return (
      <Layout>
        <div className="grid grid-cols-1 gap-4 w-full">
          {sliders.map((slider) => (
            <SliderCard key={slider._id} slider={slider} />
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

  return <InternetError name="slider" />;
}

export default Sliders;
