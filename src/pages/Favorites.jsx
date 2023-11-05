import { Container, useDisclosure } from '@chakra-ui/react';
import CarList from '../components/CarList/CarList';
import ModalCard from '../components/modal/ModalCard';

function About() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Container
			maxW={{ base: '744px', lg: '1000px', xl: '1240px' }}
			px="12px">
			<ModalCard
				isOpen={isOpen}
				onClose={onClose}
			/>
			<CarList
				showFavorites={true}
				showLoadMore={false}
				onOpen={onOpen}
			/>
		</Container>
	);
}
export default About;
