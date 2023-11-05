import { Button } from '@chakra-ui/react';

const Btn = ({ text, style = null, icon = null, onClick }) => {
	return (
		<Button
			fontSize={'14px'}
			fontWeight={'600'}
			px={'50px'}
			py={'12px'}
			borderRadius={'12px'}
			color={'white'}
			backgroundColor={'#3470FF'}
			minW={'80px'}
			leftIcon={icon}
			style={style}
			variant="solid"
			textTransform="uppercase"
			background={'blue'}
			border="none"
			boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)"
			transition="all 400ms ease"
			_hover={{
				boxShadow: '0px 5px 20px rgba(52, 112, 255, 1)',

				transform: 'translateY(-7px)',
			}}
			_active={{ transform: ' translateY(-1px)' }}
			onClick={onClick}>
			{text}
		</Button>
	);
};

export default Btn;
