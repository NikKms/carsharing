import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css';

import './CustomSlider.css';

import { Box } from '@chakra-ui/react';

const CustomSlider = ({ data }) => {
	const sliderConfig = {
		spaceBetween: 0,
		slidesPerView: 1,
		loop: true,
		pagination: {
			clickable: true,
			dynamicBullets: true,
		},
		centeredSlides: true,
		effect: 'fade',
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		modules: [EffectFade, Autoplay, Pagination],
	};

	return (
		<Swiper
			className="CustomSwiper"
			{...sliderConfig}>
			{data.map((img, index) => (
				<SwiperSlide key={index}>
					<Box
						as="div"
						h="80vh"
						w="100vw"
						bgImage={`url(${img})`}
						bgPos="center"
						bgSize="cover"
						bgRepeat="no-repeat"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default CustomSlider;
