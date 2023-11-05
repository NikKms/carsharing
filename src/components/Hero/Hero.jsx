import { NavLink } from 'react-router-dom';
import CustomSlider from '../CustomSlider/CustomSlider';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import bgHero1 from '../../assets/img/1.jpg';
import bgHero2 from '../../assets/img/2.jpg';
import bgHero3 from '../../assets/img/3.jpg';
import bgHero6 from '../../assets/img/6.jpg';
import bgHero7 from '../../assets/img/7.jpg';

const data = [bgHero1, bgHero2, bgHero3, bgHero6, bgHero7];

const Hero = () => {
	const { t } = useTranslation();

	return (
		<section style={{ position: 'relative', overflow: 'hidden' }}>
			<Box
				pos="absolute"
				zIndex="2"
				top="55%"
				left="5%">
				<Container maxW={{ base: '744px', lg: '1000px', xl: '1240px' }}>
					<Heading
						mb="5"
						color="#fff">
						{t('hero.title')}
					</Heading>
					<Button
						display={'flex'}
						w={'200px'}
						ml={'auto'}
						color={'white'}
						colorScheme={'blue'}
						as={NavLink}
						to={'/catalog'}>
						{t('hero.btn')}
					</Button>
				</Container>
			</Box>
			<CustomSlider data={data} />
		</section>
	);
};

export default Hero;
