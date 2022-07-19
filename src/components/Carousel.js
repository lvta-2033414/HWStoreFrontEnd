import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Pagination,
  Autoplay,
  EffectFade,
  Thumbs,
  FreeMode,
  Navigation,
} from 'swiper';

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

export const Gallery = memo((props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        pagination={{
          type: 'fraction',
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2">
        {props.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={`/assets/${props.category}/${image}.webp`}
                alt=""
                style={{ width: '100%' }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper">
        {props.images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={`/assets/${props.category}/${image}.webp`}
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
});

export default memo(Carousel);
