import { Container, useDisclosure } from '@chakra-ui/react';
import CarList from '../components/CarList/CarList';
import ModalCard from '../components/modal/ModalCard';
import FilterMake from '../components/Filter/FilterMake';

const EventDetails = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Container
			maxW={{ base: '744px', lg: '1000px', xl: '1240px' }}
			px="12px">
			<ModalCard
				isOpen={isOpen}
				onClose={onClose}
			/>
			<FilterMake />
			<CarList
				showFavorites={false}
				showLoadMore={true}
				onOpen={onOpen}
			/>
		</Container>
	);
};

export default EventDetails;
