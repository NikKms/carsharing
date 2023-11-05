import { NavLink } from 'react-router-dom';
import CustomSlider from '../CustomSlider/CustomSlider';
import heroBgArr from './heroBgArr';
import { Box, Button, Container, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

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
			<CustomSlider data={heroBgArr} />
		</section>
	);
};

export default Hero;
