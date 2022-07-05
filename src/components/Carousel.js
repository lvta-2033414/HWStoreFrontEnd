import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper';

import 'swiper/css/bundle';
import 'swiper/css/effect-fade';

import React, { useEffect, useState, memo } from 'react';

import '../cssfile/carousel.css';

function SwiperPC() {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      autoHeight={true}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      effect="fade"
      className="swiperPC">
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/picOne.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/picTwo.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/picThree.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

function SwiperMobile() {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      autoHeight={true}
      spaceBetween={50}
      slidesPerView={1}
      pagination={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      effect={'fade'}
      className="swiperMobile">
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/unnamed1.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/unnamed2.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="pseudo-element-1">
          <img
            src="assets/carousel/unnamed3.webp"
            alt="error"
            className="carousel-img"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

const Carousel = (props) => {
  const [size, setSize] = useState(window.innerWidth);

  const debounceSetSize = () => {
    let timeoutID;
    return function () {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      timeoutID = setTimeout(() => setSize(window.innerWidth), 500);
    };
  };
  const debounceSetSizeCallbacks = debounceSetSize();
  useEffect(() => {
    window.addEventListener('resize', debounceSetSizeCallbacks);
    return () => {
      window.removeEventListener('resize', debounceSetSizeCallbacks);
    };
  });

  return <>{size < 600 ? <SwiperMobile /> : <SwiperPC />}</>;
};

export default memo(Carousel);
