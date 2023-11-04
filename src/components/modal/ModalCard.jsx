import { Box, Button, Flex, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { selectIdToModal, useFetchCarByIdQuery, useFetchAllcarsQuery } from "../../redux/carsSlice";
import { useSelector } from "react-redux";
import { extractCityAndCountry } from "../../utils/extractCityAndCountry";
import { formatNumberWithComma } from "../../utils/formatNumberWithComma";

const ModalCard = ({ isOpen, onClose }) => {
    const idx = useSelector(selectIdToModal)
    // const { data: newCar, error: err } = useFetchCarByIdQuery(1)
    // console.log("newCar", newCar);

    const { data: cars, error } = useFetchAllcarsQuery()

    const [car, setCar] = useState(null);

    useEffect(() => {
        if (idx) {
            const foundCar = cars.find(el => el.id === idx);
            setCar(foundCar);
        }
    }, [idx, cars]);

    const phoneNumber = "+380730000000"

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) ' />
                <ModalContent p={'35px'}>
                    <ModalCloseButton />
                    <ModalBody p={'0'}>
                        {car && (
                            <>
                                <Image
                                    src={car.img}
                                    w={'100%'}
                                    maxH={'314px'}
                                    borderRadius="14px"
                                    objectFit="cover"
                                    overflow="hidden"
                                    mb={'12px'}
                                />
                                <Flex mb={"8px"} alignItems={'flex-end'} >
                                    <Box color="#121417" fontSize={'18px'} fontWeight="500">
                                        {`${car.make} `}
                                        <Box as="span" color="#3470FF">
                                            {car.model}
                                        </Box>
                                        , {car.year}
                                    </Box>
                                </Flex>

                                <Box fontSize="12px" fontWeight="400" color="rgba(18, 20, 23, 0.5)">
                                    <Box fontSize="12px" fontWeight="400" color="rgba(18, 20, 23, 0.5)" >
                                        {car.address && (
                                            <>
                                                {`${extractCityAndCountry(car.address).city} | ${extractCityAndCountry(car.address).country} | Id: ${car.id} | Year: ${car.year} | Type: ${car.type}`}
                                            </>
                                        )}
                                    </Box>
                                </Box>
                                <Box fontSize="12px" fontWeight="400" color="rgba(18, 20, 23, 0.5)" mb={'14px'}>
                                    {`Fuel Consumption: ${car.fuelConsumption} | Engine Size: ${car.engineSize}`}
                                </Box>
                                <Box fontSize="14px" fontWeight="400" mb={'24px'}>{car.description}</Box>
                                <Box fontSize="14px" fontWeight="500" mb={'8px'}>Accessories and functionalities:</Box>
                                <Box fontSize="12px" fontWeight="400" color="rgba(18, 20, 23, 0.5)" display={'flex'} flexWrap={'wrap'}>
                                    {car.accessories.map((el, index) => (
                                        <Box key={el}>
                                            {index > 0 && <Box as="span" mx={'2px'}> | </Box>}
                                            <Box as="span">{el}</Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box fontSize="12px" fontWeight="400" color="rgba(18, 20, 23, 0.5)" display={'flex'} flexWrap={'wrap'} mb={'24px'}>
                                    {car.functionalities.map((el, index) => (
                                        <Box key={el}>
                                            {index > 0 && <Box as="span" mx={'2px'}> | </Box>}
                                            <Box as="span">{el}</Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box fontSize="14px" fontWeight="500" mb={'15px'}>Rental Conditions:</Box>
                                <Box
                                    fontSize="12px"
                                    fontWeight="400"
                                    color="rgba(54, 53, 53, 1)"
                                    display={'flex'}
                                    flexWrap={"wrap"}
                                    flexDirection={'row'}
                                    gap={'22px'}
                                    mb={'8px'}>
                                    {car.rentalConditions &&
                                        car.rentalConditions.split('\n').map((phrase, index) => (
                                            <Box
                                                Box key={index}
                                                flexDirection={'row'}
                                                gap={'22px'}
                                                background={'#F9F9F9'}
                                                borderRadius={'35px'}
                                                py={'7px'}
                                                px={'14px'}>
                                                {phrase.includes(":") ? (
                                                    phrase.split(':').map((part, partIndex) => (
                                                        <Box
                                                            key={partIndex}
                                                            as="span"
                                                            borderRadius={'35px'}
                                                            color={partIndex === 1 ? '#3470FF' : 'rgba(54, 53, 53, 1)'}
                                                            fontWeight={partIndex === 1 ? '600' : '400'}
                                                            m={'2px'}
                                                        >
                                                            {part.trim()}{partIndex === 0 ? ':' : ''}
                                                        </Box>
                                                    ))
                                                ) : (
                                                    <Box
                                                        as="span"
                                                        borderRadius={'35px'}
                                                        background={'#F9F9F9'}
                                                        py={'7px'}
                                                        px={'14px'}
                                                    >
                                                        {phrase.trim()}
                                                    </Box>
                                                )}
                                            </Box>
                                        ))
                                    }
                                </Box>

                                <Box mt={'25px'}>
                                    {car.mileage &&
                                        <Box as="span"
                                            fontSize="12px"
                                            fontWeight="400"
                                            color="rgba(54, 53, 53, 1)"
                                            background={'#F9F9F9'}
                                            borderRadius={'35px'}
                                            py={'7px'}
                                            px={'14px'}
                                            mr={'22px'}
                                        >
                                            Mileage:
                                            <Box as="span" color={'#3470FF'} fontWeight={'600'} ml={'2px'}>{formatNumberWithComma(car.mileage)}</Box>
                                        </Box>}
                                    <Box as="span"
                                        fontSize="12px"
                                        fontWeight="400"
                                        color="rgba(54, 53, 53, 1)"
                                        borderRadius={'35px'}
                                        background={'#F9F9F9'}
                                        py={'7px'}
                                        px={'14px'}>
                                        Price:
                                        <Box as="span" color={'#3470FF'} fontWeight={'600'}> {car.rentalPrice}</Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                        <Link
                            href={`tel:${phoneNumber}`}
                            display={'block'}
                            maxW={'170px'}
                            fontSize={'14px'}
                            fontWeight={'600'}
                            mt={'24px'}
                            px={'50px'}
                            py={'12px'}
                            borderRadius={'12px'}
                            color={'white'}
                            backgroundColor={'#3470FF'}
                            _hover={{ transform: 'translateY(-7px)' }}
                        >
                            Rental car
                        </Link>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default ModalCard;
