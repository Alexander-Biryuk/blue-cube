import { configureStore } from '@reduxjs/toolkit';
import getProductsReducer from './getProductsSlice';
import busketReducer from './busketSlice';
import getDescriptionReducer from './getDescriptionSlice';
// import ordersReducer from './ordersSlice';
import submitReducer from './submitSlice';
import getOrdersReducer from './getOrdersSlice';

const store = configureStore({
  reducer: {
    products: getProductsReducer,
    busket: busketReducer,
    submit: submitReducer,
    getOrders: getOrdersReducer,
    // orders: ordersReducer,
    description: getDescriptionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
