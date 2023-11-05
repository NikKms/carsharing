import React from 'react';
import { useColorMode, IconButton } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeSwitcher = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			borderRadius="50%"
			bg="gray.700"
			icon={
				colorMode === 'light' ? (
					<MoonIcon color="white" />
				) : (
					<SunIcon color="yellow.400" />
				)
			}
			onClick={toggleColorMode}
			aria-label="Switch Color Mode"
		/>
	);
};

export default ColorModeSwitcher;
