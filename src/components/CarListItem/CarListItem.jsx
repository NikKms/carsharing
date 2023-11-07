import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { setFavorite } from '../../redux/favoriteSlice';

import { extractCityAndCountry } from '../../utils/extractCityAndCountry';
import { formatNumberWithComma } from '../../utils/formatNumberWithComma';

import { Box, Flex, Image, Text, IconButton } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import Btn from '../Btn/Btn';

import heartSvg from '../../assets/svg/heart.svg';
import { setIdToModal } from '../../redux/carsSlice';
import { useTranslation } from 'react-i18next';

const CarListItem = ({
	id,
	make,
	img,
	model,
	year,
	rentalPrice,
	address,
	rentalCompany,
	type,
	mileage,
	accessories,
	onOpen,
}) => {
	const dispatch = useDispatch();

	const { t } = useTranslation();

	const isFavorite =
		useSelector(
			(state) =>
				state.favorite.favorites.find((item) => item.id === id)?.isFavorite,
		) || false;

	const handleFavoriteClick = () => {
		dispatch(setFavorite({ id }));
	};

	const { city, country } = extractCityAndCountry(address);
	const formattedMileage = formatNumberWithComma(mileage);
	const maxLength = 15;

	const fontSize = model.length > maxLength ? '14px' : '16px';

	const handleOpenModal = () => {
		dispatch(setIdToModal(id));
		onOpen();
	};

	return (
		<Box
			// as="li"
			pb={'4px'}
			width="274px"
			height="426px"
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'space-between'}
			position="relative"
			borderRadius={'14px'}
			boxShadow={isFavorite ? '2xl' : ''}>
			<IconButton
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				icon={
					!isFavorite ? (
						<Image src={heartSvg} />
					) : (
						<FaHeart
							size={18}
							color={isFavorite ? 'rgba(52, 112, 255, 1)' : 'transparent'}
						/>
					)
				}
				variant={'unstyled'}
				position="absolute"
				top="4"
				right="4"
				zIndex="1"
				onClick={() => handleFavoriteClick()}
			/>

			<Box>
				<Image
					src={img}
					alt={make}
					width="274px"
					height="268px"
					borderRadius="14px"
					objectFit="cover"
					overflow="hidden"
					mb={'14px'}
				/>
				<Box px={'2px'}>
					<Flex
						justifyContent="space-between"
						mb={'8px'}
						alignItems={'flex-end'}>
						<Text
							fontSize={fontSize}
							fontWeight="500">
							{`${make} `}
							<Box
								as="span"
								color="#3470FF">
								{model}
							</Box>
							, {year}
						</Text>
						<Text
							fontSize="16px"
							fontWeight="500">
							{rentalPrice}
						</Text>
					</Flex>

					<Text
						fontSize="12px"
						fontWeight="400"
						colorScheme={'gray'}>
						{`${city} | ${country} | ${rentalCompany}`}
					</Text>
					{accessories && accessories[1] && (
						<Text
							fontSize="12px"
							fontWeight="400"
							colorScheme={'gray'}>
							{`${type} | ${make} | ${formattedMileage} | ${accessories[2]}`}
						</Text>
					)}
				</Box>
			</Box>
			<Btn
				text={t('card.btn')}
				style={{ background: isFavorite ? '#3430FF' : '#5281f1' }}
				w={'100%'}
				onClick={handleOpenModal}
			/>
		</Box>
	);
};

CarListItem.propTypes = {
	id: PropTypes.string.isRequired,
	make: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	model: PropTypes.string.isRequired,
	year: PropTypes.number.isRequired,
	rentalPrice: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	rentalCompany: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	mileage: PropTypes.number.isRequired,
	accessories: PropTypes.array.isRequired,
	onOpen: PropTypes.func.isRequired,
};

export default CarListItem;
