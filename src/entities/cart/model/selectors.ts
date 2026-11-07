import { cartSelectors } from '../../../shared/store/slices/cart';
import { RootState } from '../../../shared/store/types';

export const selectCartProductById = (id: string) => (state: RootState) =>
	cartSelectors.getCartProducts(state).find((p) => p.id === id);

export const selectIsProductInCart = (id: string) => (state: RootState) =>
	Boolean(selectCartProductById(id)(state));
