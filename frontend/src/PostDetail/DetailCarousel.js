import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './DetailCarousel.css';

// import required modules
import { Pagination } from 'swiper';

export default function DetailCarousel({ images }) {
  return (
    <Swiper
      style={{
        '--swiper-navigation-color': '#deb887',
        '--swiper-pagination-color': '#deb887',
      }}
      pagination={true}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images &&
        images.map(image => (
          <SwiperSlide key={image.url}>
            <img className="detail_img" src={image.url} alt="이미지사진" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
