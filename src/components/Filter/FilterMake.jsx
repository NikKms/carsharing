import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
	setSortMakeData,
	setFiltredMakeData,
	useFetchAllcarsQuery,
} from '../../redux/carsSlice';
import { useDispatch } from 'react-redux';
import {
	Box,
	Button,
	Flex,
	Input,
	Text,
	ChakraProvider,
	theme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const customStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: '1px solid #ccc',
		color: state.isSelected ? '#fff' : '#000',
		backgroundColor: state.isSelected ? theme.colors.blue[500] : '#fff',
		'&:hover': {
			backgroundColor: theme.colors.blue[500],
			color: '#fff',
		},
	}),
	control: (provided) => ({
		...provided,
		width: '160px',
		borderColor: '#ccc',
	}),
};

const FilterMake = () => {
	const [filterData, setFilterData] = useState([]);
	const [priceData, setPriceData] = useState([]);
	const [mileageRange, setMileageRange] = useState({ from: '', to: '' });
	const [selectedMakeOption, setSelectedMakeOption] = useState(null);
	const [selectedPriceOption, setSelectedPriceOption] = useState(null);

	const { t } = useTranslation();

	const dispatch = useDispatch();

	const { data, isLoading } = useFetchAllcarsQuery();

	useEffect(() => {
		if (data && !isLoading) {
			const uniqueMakes = [...new Set(data.map((car) => car.make))];
			const makesOptions = uniqueMakes.map((make) => ({
				value: make,
				label: make,
			}));

			const uniquePrices = [...new Set(data.map((car) => car.rentalPrice))];
			const priceOptions = uniquePrices
				.map((price) => ({
					value: price.slice(1),
					label: price.slice(1),
				}))
				.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));

			setFilterData(makesOptions);
			setPriceData(priceOptions);
		}
	}, [data, isLoading]);

	const handleSelectChangeMake = async (selectedOption) => {
		const selectedMakeValue = selectedOption ? selectedOption.value : '';
		setSelectedMakeOption(selectedOption);

		dispatch(setSortMakeData(selectedMakeValue));

		const filteredCars = data.filter((car) => car.make === selectedMakeValue);

		dispatch(setFiltredMakeData(filteredCars));
	};

	const handleSelectChangePrice = async (selectedOption) => {
		const selectedPriceValue = selectedOption ? selectedOption.value : '';
		setSelectedPriceOption(selectedOption);

		dispatch(setSortMakeData(selectedPriceValue));

		const filteredCars = data.filter(
			(car) => parseFloat(car.rentalPrice.slice(1)) >= selectedPriceValue,
		);

		dispatch(setFiltredMakeData(filteredCars));
	};

	const handleMileageRangeChange = (e) => {
		const { name, value } = e.target;
		setMileageRange((prev) => ({ ...prev, [name]: value }));
	};

	const handleMileageFilter = () => {
		const { from, to } = mileageRange;

		if (from === '' && to === '') {
			dispatch(setFiltredMakeData(data));
		} else {
			const filteredCars = data.filter((car) => {
				const mileage = parseFloat(car.mileage);
				const fromValue =
					from !== '' ? parseFloat(from) : Number.NEGATIVE_INFINITY;
				const toValue = to !== '' ? parseFloat(to) : Number.POSITIVE_INFINITY;
				return mileage >= fromValue && mileage <= toValue;
			});

			dispatch(setFiltredMakeData(filteredCars));
		}
	};

	const handleReset = () => {
		setSelectedMakeOption(null);
		setSelectedPriceOption(null);
		setMileageRange({ from: '', to: '' });
		dispatch(setFiltredMakeData([]));
	};

	return (
		<ChakraProvider theme={theme}>
			<Box
				pt={'32px'}
				as="section"
				display={'flex'}
				flexDirection={['column', 'column', 'row', 'row']}
				justifyContent={['center', 'center', 'space-between', 'space-between']}
				alignItems={['center', 'center', 'flex-end', 'flex-end']}
				gap={['18px', '18px', '0', '0']}>
				<Box as="div">
					<Text
						fontSize={['14px', '14px', '16px', '16px']}
						colorScheme="gray">
						{t('filter.label')}
					</Text>
					<Select
						options={filterData}
						value={selectedMakeOption}
						onChange={handleSelectChangeMake}
						styles={customStyles}
					/>
				</Box>
				<Box as="div">
					<Text
						fontSize={['14px', '14px', '16px', '16px']}
						colorScheme="gray">
						{t('filter.price')}
					</Text>
					<Select
						placeholder={'To'}
						options={priceData}
						value={selectedPriceOption}
						onChange={handleSelectChangePrice}
						styles={customStyles}
					/>
				</Box>

				<Box as="div">
					<Text
						fontSize={['14px', '14px', '16px', '16px']}
						colorScheme="gray">
						{t('filter.mileage')}
					</Text>
					<Flex>
						<Input
							maxW={['100%', '100%', '160px', '160px']}
							type="number"
							placeholder="From Mileage"
							name="from"
							value={mileageRange.from}
							onChange={handleMileageRangeChange}
						/>
						<Input
							maxW={['100%', '100%', '160px', '160px']}
							type="number"
							placeholder="To Mileage"
							name="to"
							value={mileageRange.to}
							onChange={handleMileageRangeChange}
						/>
					</Flex>
				</Box>

				<Flex
					direction={['column', 'column', 'row', 'row']}
					align={['center', 'center', 'flex-end', 'flex-end']}
					gap={['10px', '10px', '10px', '10px']}>
					<Button
						bgColor={theme.colors.blue[500]}
						color={'white'}
						_hover={{ backgroundColor: theme.colors.blue[600] }}
						onClick={handleMileageFilter}>
						{t('filter.btn')}
					</Button>
					<Button
						bgColor={theme.colors.blue[500]}
						color={'white'}
						_hover={{ backgroundColor: theme.colors.blue[600] }}
						onClick={handleReset}>
						{t('filter.reset')}
					</Button>
				</Flex>
			</Box>
		</ChakraProvider>
	);
};

export default FilterMake;
