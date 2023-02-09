import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './HomeCarousel.css';

// import required modules
import { Pagination } from 'swiper';

export default function HomeCarousel() {
  return (
    <>
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
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjJfMTYw%2FMDAxNjI5NTYwODY2MjI0.Vco-WmnxXlIRj08eYipQIVjzvUgeAGrIKZDSPmwvcnog.yzwYknZ2eUK5ZnNyz4nRSxXNoyPYDRC_a8RgPeqRCA8g.JPEG.chooddingg%2Foutput_4182079403.jpg&type=a340"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MTRfODMg%2FMDAxNjYzMTYyNzU2MDQx.f_cnj4iKQ7NdDJGD0kvB8Z-lteOv3d5V510X3Ts_PXQg.A39TF3sh_3-H-jBU0QK86joXh6sS6SFrMeBehZBY6mEg.JPEG.kim061125_%2FIMG_3653.JPG&type=a340"
            alt="#"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMThfMjk1%2FMDAxNjcxMzAzNTUzOTc0.1ZG1ZVLBECFUV9ZZhp7-NIl1GyplzQooaa-zVa2dw00g.48nVqOiDAGAQ25TA4YU33iBxFVb4Qcia3gSMAdoVeJQg.PNG.ghwns3366%2F%25B0%25ED%25C3%25DF2.png&type=a340"
            alt="#"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
