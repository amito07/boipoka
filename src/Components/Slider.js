import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';
import './styles.css';
import slidepic1 from '../image/1.jpg'
import slidepic2 from '../image/2.jpg'
import slidepic3 from '../image/3.jpg'
import slidepic4 from '../image/4.jpg'
import slidepic5 from '../image/5.jpg'

SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

function Slider() {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [controlledSwiper, setControlledSwiper] = useState(null);

  const slides = [];
  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`} tag="li">
        <img
          src={slidepic1}
          style={{ listStyle: 'none' }}
          alt={`Slide ${i}`}
        />
      </SwiperSlide>
    );
  }

//   const thumbs = [];
//   for (let i = 0; i < 5; i += 1) {
//     thumbs.push(
//       <SwiperSlide key={`thumb-${i}`} tag="li" style={{ listStyle: 'none' }}>
//         <img
//           src={`https://picsum.photos/id/${i}/163/100`}
//           alt={`Thumbnail ${i}`}
//         ></img>
//       </SwiperSlide>
//     );
//   }

//   const slides2 = [];
//   for (let i = 9; i < 14; i += 1) {
//     slides2.push(
//       <SwiperSlide key={`slide-${i}`} tag="li">
//         <img
//           src={`https://picsum.photos/id/${i + 1}/500/300`}
//           style={{ listStyle: 'none' }}
//           alt={`Slide ${i}`}
//         />
//       </SwiperSlide>
//     );
//   }

  return (
    <React.Fragment>
      <Swiper id="main">{slides}</Swiper>
      {/* <Swiper
        id="thumbs"
        spaceBetween={5}
        slidesPerView={3}
        onSwiper={setThumbsSwiper}
      >
        {thumbs}
      </Swiper>

      <Swiper id="controller" onSwiper={setControlledSwiper}>
        {slides2}
      </Swiper> */}
    </React.Fragment>
  );
}

export default Slider;