import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';

export const carsApi = createApi({
	reducerPath: 'carsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://6543610901b5e279de204190.mockapi.io/api/v1',
	}),
	endpoints: (builder) => ({
		fetchCars: builder.query({
			query: (p = 1, limit = 12) => `/cars?p=${p}&limit=${limit}`,
			providesTags: ['Cars'],
		}),
		fetchAllcars: builder.query({
			query: () => '/cars',
			providesTags: ['AllCars'],
		}),
		fetchCarById: builder.query({
			query: (carId) => ({
				url: `/cars/${carId}`,
				method: 'GET',
			}),
			invalidatesTags: ['car'],
		}),
	}),
});

export const {
	useFetchCarsQuery,
	useFetchAllcarsQuery,
	useFetchCarByIdQuery,
	reducer: carsReducer,
} = carsApi;

const carsSlice = createSlice({
	name: 'cars',
	initialState: {
		pValue: 1,
		dataCars: [],
		idToModal: '',
		sortMakeData: '',
		filtredMakeData: [],
	},
	reducers: {
		setPValue: (state, action) => {
			state.pValue = action.payload;
		},
		setCars: (state, action) => {
			const newData = action.payload.filter(
				(newCar) =>
					!state.dataCars.some((existingCar) => existingCar.id === newCar.id),
			);
			state.dataCars = [...state.dataCars, ...newData];
		},
		setIdToModal: (state, action) => {
			state.idToModal = action.payload;
		},
		setSortMakeData: (state, action) => {
			state.sortMakeData = action.payload;
		},
		setFiltredMakeData: (state, action) => {
			state.filtredMakeData = action.payload;
		},
	},
});

export const {
	setPValue,
	setCars,
	setIdToModal,
	setSortMakeData,
	setFiltredMakeData,
} = carsSlice.actions;

export const { reducer: carsSliceReducer } = carsSlice;

export const selectPValue = (state) => state.cars.pValue;
export const selectDataCars = (state) => state.cars.dataCars;
export const selectIdToModal = (state) => state.cars.idToModal;
export const selectSortMakeData = (state) => state.cars.sortMakeData;
export const selectFiltredMakeData = (state) => state.cars.filtredMakeData;

export const rootReducer = {
	cars: carsSliceReducer,
	[carsApi.reducerPath]: carsReducer,
};
