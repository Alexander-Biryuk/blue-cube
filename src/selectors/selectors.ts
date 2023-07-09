import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const selectBusket = (state: RootState) => state.busket;
const selectDescription = (state: RootState) => state.description;
const selectProducts = (state: RootState) => state.products;
const selectOrders = (state: RootState) => state.getOrders;

export const selectBusketMemoized = createSelector(selectBusket, (busket) => busket.busket);
export const selectBusketUpdating = createSelector(selectBusket, (busket) => busket.isLoading);
export const selectBusketError = createSelector(selectBusket, (busket) => busket.error);

export const selectProductsData = createSelector(selectProducts, (products) => products.products);
export const selectProductsIsLoading = createSelector(selectProducts, (products) => products.loading);
export const selectProductsError = createSelector(selectProducts, (products) => products.error);

export const selectDescriptionGood = createSelector(selectDescription, (description) => description.data);
export const selectDescriptionIsLoading = createSelector(selectDescription, (description) => description.loading);
export const selectDescriptionError = createSelector(selectDescription, (description) => description.error);

export const selectOrdersMemoized = createSelector(selectOrders, (orders) => orders.orders);
export const selectOrdersIsLoading = createSelector(selectOrders, (orders) => orders.isLoading);
export const selectOrdersError = createSelector(selectOrders, (orders) => orders.error);
