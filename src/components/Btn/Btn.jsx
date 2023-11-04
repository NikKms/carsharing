import { Button } from '@chakra-ui/react';

const Btn = ({ text, style = null, icon = null, onClick }) => {
  return (
    <Button
      minW={'80px'}
      leftIcon={icon}
      style={style}
      variant="solid"
      p="0 15px"
      color='#fff'
      fontSize="12px"
      textTransform="uppercase"
      background={'linear-gradient(5deg, rgba(43,48,103,1) 16%, rgba(31,133,232,1) 54%, rgba(33,108,235,1) 98%)'}
      // bgImage={'linear-gradient(145deg, #06c6b6 0%, #93deb0 100%)'}
      border="none"
      borderRadius="45px"
      boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
      transition="all 400ms ease"
      _hover={{
        backgroundImage: 'linear-gradient(5deg, rgba(43,48,103,1) 16%, rgba(31,133,232,1) 54%, rgba(33,108,235,1) 98%)',
        boxShadow: '0px 5px 20px rgba(52, 112, 255, 1)',

        transform: 'translateY(-7px)',
      }
      }
      _active={{ transform: ' translateY(-1px)' }}
      onClick={onClick}
    >
      {text}
    </Button >
  );
};

export default Btn;
