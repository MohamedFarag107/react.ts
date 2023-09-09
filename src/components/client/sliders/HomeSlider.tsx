import { Box, Skeleton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useGetAllSlidersQuery } from "../../../api/slider.api";

const SwiperLoading = () => {
  return (
    <>
      <Box className="container p-0">
        <Swiper spaceBetween={50} slidesPerView={1}>
          {Array.from(Array(3).keys()).map((_, index) => (
            <SwiperSlide key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{
                  height: {
                    xs: "300px",
                    md: "600px",
                  },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

const SwiperError = ({ message }: { message: string }) => {
  return (
    <div>
      <p className="text-red-600">{message}</p>
    </div>
  );
};

function HomeSlider() {
  const { data, isLoading, isSuccess, isError, error } = useGetAllSlidersQuery({
    query: "?sort=-updatedAt",
  });
  // loading
  if (isLoading) return <SwiperLoading />;
  // error
  if (isError && "data" in error)
    return <SwiperError message={error.data.message} />;
  // success
  if (isSuccess && data) {
    const sliders = data?.data;
    return (
      <Box className="container p-0">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          spaceBetween={50}
          slidesPerView={1}
        >
          {sliders?.map((slider) => (
            <SwiperSlide key={slider._id} className="h-full">
              <img
                src={slider.image}
                alt={"slider image"}
                className="w-full max-h-[600px] min-h-[300px] object-cover object-right"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    );
  }
  return <p>no sliders...</p>;
}

export default HomeSlider;
