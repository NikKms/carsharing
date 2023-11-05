import { Box, Button, Spinner, Text } from '@chakra-ui/react';
import CarListItem from '../CarListItem/CarListItem';
import {
	selectDataCars,
	selectFiltredMakeData,
	setCars,
	useFetchAllcarsQuery,
	useFetchCarsQuery,
} from '../../redux/carsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setPValue, selectPValue } from '../../redux/carsSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CarList = ({ showFavorites, showLoadMore, onOpen }) => {
	const [showBtn, setShowBtn] = useState(true);
	const dataCars = useSelector(selectDataCars);
	const currentPValue = useSelector(selectPValue);
	const favoriteCars = useSelector((state) => state.favorite.favorites);
	const filterData = useSelector(selectFiltredMakeData);
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const currentPathname = window.location.pathname;

	const {
		data: cars = [],
		error,
		isLoading,
		isFetching,
	} = showFavorites ? useFetchAllcarsQuery() : useFetchCarsQuery(currentPValue);

	const filteredCars =
		filterData.length > 0
			? filterData
			: !showFavorites
			? dataCars
			: cars?.filter((car) =>
					showFavorites
						? favoriteCars?.map((el) => el.id).includes(car.id)
						: true,
			  ) || [];

	useEffect(() => {
		if (cars.length > 0 && currentPathname.includes('/catalog'))
			dispatch(setCars(cars));
	}, [dispatch, cars]);

	const handleIncrementP = async () => {
		if (cars.length !== 0) dispatch(setPValue(currentPValue + 1));
		if (cars.length < 12) {
			setShowBtn(false);
		}
	};

	if (isLoading) {
		return (
			<Box
				h={'100%'}
				w={'100%'}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}>
				<Spinner
					size={'xl'}
					alignSelf={'center'}
				/>
			</Box>
		);
	}

	if (error) {
		return <div>Error loading cars: {error.message}</div>;
	}

	return (
		<Box my={'60px'}>
			{favoriteCars.length === 0 && currentPathname.includes('/favorite') ? (
				<div>{t('carList.anyCar')}</div>
			) : (
				<Box
					as="ul"
					display={'flex'}
					flexWrap={'wrap'}
					gap={'50px 29px'}
					alignItems={'center'}
					justifyContent={'center'}>
					{filteredCars.map(({ id, ...carProps }) => (
						<CarListItem
							key={id}
							id={id}
							{...carProps}
							onOpen={onOpen}
						/>
					))}
				</Box>
			)}
			{filterData.length === 0 && !showBtn ? (
				<Text
					mt={'32px'}
					fontSize={'xl'}>
					{t('carList.endList')}
				</Text>
			) : (
				showLoadMore &&
				filterData.length === 0 && (
					<Button
						onClick={handleIncrementP}
						color={'white'}
						background={'#3470FF'}
						display={'flex'}
						mx={'auto'}
						mt={'32px'}
						px={'40px'}
						py={'12px'}>
						{isFetching ? <Spinner /> : t('carList.btn')}
					</Button>
				)
			)}
		</Box>
	);
};

export default CarList;
