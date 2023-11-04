import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { carsApi, carsSliceReducer } from './carsSlice';
import favorite from './favoriteSlice';
import { setPValue } from './carsSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['favorite'],
};

const rootReducer = combineReducers({
    [carsApi.reducerPath]: carsApi.reducer,
    favorite,
    cars: carsSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(carsApi.middleware),
});

export const persistor = persistStore(store);

store.dispatch(setPValue(1));

export default store;
