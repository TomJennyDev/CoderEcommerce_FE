import { Box } from "@mui/material";
import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../app/config";
import "./carousel.css";
import MainSwiperSlide from "./MainSwiperSlide";
import SubSwiperSlide from "./SubSwiperSlide";

function Carousel({ movieListTopRate }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Box sx={{ width: 1, height: "100vh", position: "relative", mb: "100px" }}>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        autoplay={{ delay: 5000 }}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="main_carousel"
      >
        {movieListTopRate?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              {({ isActive }) => (
                <MainSwiperSlide movie={movie} isActive={isActive} />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        autoplay={{ delay: 5000 }}
        freeMode={true}
        watchSlidesProgress={true}
        breakpoints={{
          slidesPerView: 1,
          spaceBetween: 2,
          320: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 1,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 1,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="sub_carousel"
      >
        {movieListTopRate?.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <SubSwiperSlide
                imgUrl={apiConfig.w220Image(movie.backdrop_path)}
                title={movie.title}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default Carousel;
