import { Container } from '@chakra-ui/react';
import CarList from '../components/CarList/CarList';

function About() {
	return (
		<Container
			maxW={{ base: '744px', lg: '1000px', xl: '1240px' }}
			px="12px">
			<CarList
				showFavorites={true}
				showLoadMore={false}
			/>
		</Container>
	);
}
export default About;
