import {
	Box,
	Image,
	Link,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	Alert,
	AlertIcon,
	Skeleton,
} from '@chakra-ui/react';

import { selectIdToModal, useFetchCarByIdQuery } from '../../redux/carsSlice';
import { useSelector } from 'react-redux';
import { extractCityAndCountry } from '../../utils/extractCityAndCountry';
import { formatNumberWithComma } from '../../utils/formatNumberWithComma';
import { useTranslation } from 'react-i18next';

const ModalCard = ({ isOpen, onClose }) => {
	const idx = useSelector(selectIdToModal);

	const { t } = useTranslation();

	const carQuery = useFetchCarByIdQuery(idx || '');
	const { data: car, error, isFetching } = carQuery;

	const phoneNumber = '+380730000000';

	return (
		<Box>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered
				size={'xl'}>
				<ModalOverlay
					bg="blackAlpha.300"
					backdropFilter="blur(10px)"
				/>
				<ModalContent p={'35px'}>
					<ModalCloseButton />
					<ModalBody p={'0'}>
						{isFetching && (
							<Skeleton
								height="314px"
								width="100%"
								borderRadius="14px"
							/>
						)}
						{error && (
							<Alert
								status="error"
								mb={4}>
								<AlertIcon />
								Error loading car details. Please try again later.
							</Alert>
						)}
						{!error && car && (
							<>
								{isFetching && (
									<>
										<Skeleton
											height="50px"
											width="100%"
											borderRadius="14px"
											mt={'50px'}
										/>
										<Skeleton
											height="50px"
											width="100%"
											borderRadius="14px"
											mt={'30px'}
										/>
										<Skeleton
											height="50px"
											width="100%"
											borderRadius="14px"
											mt={'30px'}
										/>
									</>
								)}
								<Box
									h={'314px'}
									mb={'12px'}>
									{!isFetching && (
										<Image
											src={car.img}
											w={'100%'}
											h={'314px'}
											borderRadius="14px"
											objectFit="cover"
											overflow="hidden"
										/>
									)}
								</Box>
								<Text
									fontSize={'18px'}
									fontWeight="500">
									{`${car.make} `}
									<Box
										as="span"
										color="#3470FF">
										{car.model}
									</Box>
									, {car.year}
								</Text>
								<Text
									fontSize="12px"
									fontWeight="400"
									colorScheme={'gray'}>
									{car.address && (
										<>
											{`${extractCityAndCountry(car.address).city} | ${
												extractCityAndCountry(car.address).country
											} | Id: ${car.id} | Year: ${car.year} | Type: ${
												car.type
											}`}
										</>
									)}
								</Text>
								<Text
									fontSize="12px"
									fontWeight="400"
									colorScheme={'gray'}
									mb={'14px'}>
									{`Fuel Consumption: ${car.fuelConsumption} | Engine Size: ${car.engineSize}`}
								</Text>
								<Text
									fontSize="14px"
									fontWeight="400"
									mb={'24px'}>
									{car.description}
								</Text>
								<Text
									fontSize="14px"
									fontWeight="500"
									mb={'8px'}>
									Accessories and functionalities:
								</Text>
								<Box
									as="div"
									fontSize="12px"
									fontWeight="400"
									colorScheme={'gray'}
									display={'flex'}
									flexWrap={'wrap'}>
									{car.accessories?.map((el, index) => (
										<Box
											as="span"
											key={el}>
											{index > 0 && (
												<Box
													as="span"
													mx={'2px'}>
													{' '}
													|{' '}
												</Box>
											)}
											<Box as="span">{el}</Box>
										</Box>
									))}
								</Box>
								<Box
									as="div"
									fontSize="12px"
									fontWeight="400"
									colorScheme={'gray'}
									display={'flex'}
									flexWrap={'wrap'}
									mb={'24px'}>
									{car.functionalities?.map((el, index) => (
										<Box key={el}>
											{index > 0 && (
												<Box
													as="span"
													mx={'2px'}>
													{' '}
													|{' '}
												</Box>
											)}
											<Box as="span">{el}</Box>
										</Box>
									))}
								</Box>
								<Text
									fontSize="14px"
									fontWeight="500"
									mb={'15px'}>
									Rental Conditions:
								</Text>
								<Box
									as="div"
									fontSize="12px"
									fontWeight="400"
									color="rgba(54, 53, 53, 1)"
									display={'flex'}
									flexWrap={'wrap'}
									flexDirection={'row'}
									gap={'22px'}
									mb={'8px'}>
									{car.rentalConditions &&
										car.rentalConditions.split('\n').map((phrase, index) => (
											<Box
												as="div"
												key={index}
												flexDirection={'row'}
												gap={'22px'}
												background={'#F9F9F9'}
												borderRadius={'35px'}
												py={'7px'}
												px={'14px'}>
												{phrase.includes(':') ? (
													phrase.split(':').map((part, partIndex) => (
														<Box
															as="span"
															key={partIndex}
															borderRadius={'35px'}
															color={
																partIndex === 1
																	? '#3470FF'
																	: 'rgba(54, 53, 53, 1)'
															}
															fontWeight={partIndex === 1 ? '600' : '400'}
															m={'2px'}>
															{part.trim()}
															{partIndex === 0 ? ':' : ''}
														</Box>
													))
												) : (
													<Box
														as="span"
														borderRadius={'35px'}
														background={'#F9F9F9'}
														py={'7px'}
														px={'14px'}>
														{phrase.trim()}
													</Box>
												)}
											</Box>
										))}
								</Box>
								<Box mt={'25px'}>
									{car.mileage && (
										<Box
											as="span"
											fontSize="12px"
											fontWeight="400"
											color="rgba(54, 53, 53, 1)"
											background={'#F9F9F9'}
											borderRadius={'35px'}
											py={'7px'}
											px={'14px'}
											mr={'22px'}>
											Mileage:
											<Box
												as="span"
												color={'#3470FF'}
												fontWeight={'600'}
												ml={'2px'}>
												{formatNumberWithComma(car.mileage)}
											</Box>
										</Box>
									)}
									<Box
										as="span"
										fontSize="12px"
										fontWeight="400"
										color="rgba(54, 53, 53, 1)"
										borderRadius={'35px'}
										background={'#F9F9F9'}
										py={'7px'}
										px={'14px'}>
										Price:
										<Box
											as="span"
											color={'#3470FF'}
											fontWeight={'600'}>
											{car.rentalPrice}
										</Box>
									</Box>
								</Box>
							</>
						)}
						<Link
							href={`tel:${phoneNumber}`}
							display={'block'}
							maxW={'200px'}
							fontSize={'14px'}
							fontWeight={'600'}
							mt={'24px'}
							px={'50px'}
							py={'12px'}
							borderRadius={'12px'}
							color={'white'}
							backgroundColor={'#3470FF'}
							_hover={{ transform: 'translateY(-7px)' }}>
							{t('modal.btn')}
						</Link>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ModalCard;
