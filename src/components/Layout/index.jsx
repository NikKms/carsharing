import { Box, Flex } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import BtnToTop from '../BtnToTop/BtnToTop';

const Layout = ({ children }) => {
	return (
		<Box
			margin="0 auto"
			transition="0.5s ease-out">
			<Flex
				wrap="wrap"
				minHeight="100vh">
				<Header />
				<Box
					width="full"
					as="main">
					{children}
				</Box>
				<BtnToTop />
				<Footer />
			</Flex>
		</Box>
	);
};

export default Layout;
