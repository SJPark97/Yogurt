import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './DetailCarousel.css';

// import required modules
import { Pagination } from 'swiper';

export default function DetailCarousel({images}) {

    return (
        <Swiper
            style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            }}
            pagination={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            modules={[Pagination]}
            className="mySwiper"
        >
            {images && images.map(image => (
                <SwiperSlide>
                    <img className="detail_img" src={image.url} alt="이미지사진" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
