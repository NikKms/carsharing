import React from "react";
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import bg from '../../assets/img/homeBg.jpg'

const Hero = () => {
    return <Box
    as="section"
    backgroundImage={bg} 
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    height="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    color="white" 
    fontSize="24px"
  >
   <VStack spacing={4}>
        <Heading fontSize="2xl">Тема Каршеринга</Heading>
        <Text>Здесь может быть информация о каршеринге и т.д.</Text>
      </VStack>
  </Box>
};

export default Hero