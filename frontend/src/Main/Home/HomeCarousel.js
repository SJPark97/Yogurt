import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './HomeCarousel.css';

// import required modules
import { Pagination } from 'swiper';

import Danaka from '../../Images/Colorful Y2K New Collection Big Sale Instagram Post (2).png';
import Intro from '../../Images/Beige Minimalist Fashion Product Promotion Facebook Ad.png';
import Ad from '../../Images/youhavetobuy.png';

export default function HomeCarousel() {
  return (
    <>
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
        <SwiperSlide>
          <img src={Intro} alt="#" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Danaka} alt="#" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Ad} alt="#" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
