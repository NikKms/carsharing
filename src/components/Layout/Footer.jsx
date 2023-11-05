import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
	return (
		<Container maxW={{ base: '768px', lg: '1000px', xl: '1240px' }}>
			<Box
				w={'100%'}
				py="4"
				borderTop="1px solid #E2E8F0"
				display="flex"
				justifyContent="center">
				<Flex
					gap={4}
					pt={2}
					pb={2}>
					<Text fontSize="13px">
						Created by <b>Nikolay Kamyshnikov</b>
					</Text>
					<Flex gap="2">
						<Link
							href="https://www.linkedin.com/in/nikolay-kamyshnikov-b67484258/"
							isExternal
							transition="background-color 0.2s"
							_hover={{ color: 'blue' }}>
							<FaLinkedin size={24} />
						</Link>
						<Link
							href="https://github.com/NikKms"
							isExternal
							transition="background-color 0.2s"
							_hover={{ color: 'blue' }}>
							<FaGithub size={24} />
						</Link>
					</Flex>
				</Flex>
			</Box>
		</Container>
	);
};

export default Footer;
