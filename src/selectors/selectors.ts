import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

const selectBusket = (state: RootState) => state.busket;
const selectDescription = (state: RootState) => state.description;
const selectProducts = (state: RootState) => state.products;

export const selectBusketMemoized = createSelector(selectBusket, (busket) => busket.busket);
export const selectBusketUpdating = createSelector(selectBusket, (busket) => busket.isLoading);
export const selectBusketError = createSelector(selectBusket, (busket) => busket.error);

export const selectData = createSelector(selectProducts, products => products.products);

export const selectGood = createSelector(selectDescription, description => description.data);

export const selectDescriptionIsLoading = createSelector(selectDescription, description => description.loading);

export const selectError = createSelector(selectDescription, description => description.error);

export const selectProductsIsLoading = createSelector(selectProducts, products => products.loading);


