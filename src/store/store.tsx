import { configureStore } from '@reduxjs/toolkit';
import getProductsReducer from './getProductsSlice';
import busketReducer from './busketSlice';

const store = configureStore({
  reducer: {
    products: getProductsReducer,
    busket: busketReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
