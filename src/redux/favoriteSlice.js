import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
	name: 'favorite',
	initialState: {
		favorites: [],
	},
	reducers: {
		setFavorite: (state, action) => {
			const { id } = action.payload;
			const existingItem = state.favorites.find((item) => item.id === id);

			if (existingItem) {
				existingItem.isFavorite = !existingItem.isFavorite;
				if (!existingItem.isFavorite) {
					state.favorites = state.favorites.filter((item) => item.id !== id);
				}
			} else {
				state.favorites.push({ id, isFavorite: true });
			}
		},
	},
});

export const { setFavorite } = favoriteSlice.actions;

export default favoriteSlice?.reducer;
