import PropTypes from 'prop-types';

import { Box, Flex, Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setFiltredMakeData } from '../../redux/carsSlice';

const itemVariants = {
	hidden: {
		opacity: 0,
		x: -20,
		scale: 0.8,
	},
	visible: (custom) => ({
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			delay: custom * 0.2,
			ease: 'easeOut',
			duration: 0.5,
		},
	}),
	hover: {
		scale: 1.1,
	},
};

const NavBar = ({ onClose }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	return (
		<Flex
			as={motion.ul}
			initial="hidden"
			whileInView="visible"
			viewport={{
				amount: 0.2,
				once: true,
			}}
			gap={5}
			listStyleType="none"
			display="flex"
			flexDirection="column">
			<Box
				as={motion.li}
				variants={itemVariants}
				custom={1}>
				<Button
					as={NavLink}
					fontSize={'18px'}
					variant="link"
					_activeLink={{
						fontSize: '24px',
						fontWeight: '600',
					}}
					colorScheme="blue"
					to="/"
					onClick={() => {
						onClose();
						dispatch(setFiltredMakeData([]));
					}}>
					{t('nav.home')}
				</Button>
			</Box>
			<Box
				as={motion.li}
				variants={itemVariants}
				custom={2}>
				<Button
					as={NavLink}
					fontSize={'18px'}
					variant="link"
					colorScheme="blue"
					_activeLink={{
						fontSize: '24px',
						fontWeight: '600',
					}}
					to="/catalog"
					onClick={() => {
						onClose();
						dispatch(setFiltredMakeData([]));
					}}>
					{t('nav.catalog')}
				</Button>
			</Box>
			<Box
				as={motion.li}
				variants={itemVariants}
				custom={3}>
				<Button
					as={NavLink}
					fontSize={'18px'}
					variant="link"
					_activeLink={{
						fontSize: '24px',
						fontWeight: '600',
					}}
					colorScheme="blue"
					to="/favorite"
					onClick={() => {
						onClose();
						dispatch(setFiltredMakeData([]));
					}}>
					{t('nav.favorite')}
				</Button>
			</Box>
		</Flex>
	);
};
NavBar.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default NavBar;
