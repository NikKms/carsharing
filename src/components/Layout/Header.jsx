import {
	Box,
	Container,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerOverlay,
	IconButton,
	Image,
	useDisclosure,
	Flex,
	Text,
} from '@chakra-ui/react';
import NavBar from '../NavBar/NavBar';
import { useRef } from 'react';
import logo from '../../assets/img/logo.png';
import LangSelect from '../LangSelect/LangSelect';
import ColorModeSwitcher from '../ColorModeSwitcher/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	return (
		<Box w={'100%'}>
			<Container
				maxW={{ base: '744px', lg: '1000px', xl: '1240px' }}
				px="12px"
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<Flex
					as={NavLink}
					to={'/'}
					align={'center'}
					justify={'center'}
					gap={'16px'}>
					<Image
						src={logo}
						w={'80px'}
					/>
					<Text
						fontSize={'28px'}
						fontWeight={'600'}>
						CARSHARING
					</Text>
				</Flex>
				<IconButton
					ml={'auto'}
					onClick={() => onOpen()}>
					<HamburgerIcon />
				</IconButton>
			</Container>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent pt={'24px'}>
					<IconButton
						display={'flex'}
						ml={'auto'}
						mr={'auto'}
						onClick={() => onClose()}>
						<CloseIcon />
					</IconButton>
					<DrawerBody
						pt={'120px'}
						color="white">
						<Flex
							direction="column"
							alignItems="center"
							gap={'120px'}>
							<NavBar onClose={onClose} />
							<Flex gap={'40px'}>
								<LangSelect />
								<ColorModeSwitcher />
							</Flex>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Box>
	);
};

export default Header;
