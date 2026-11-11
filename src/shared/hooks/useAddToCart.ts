import { useCallback } from 'react';
import { cartActions } from '../store/slices/cart';
import { useAppDispatch } from '../store/utils';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();

	const addProductToCart = useCallback(
		(product: Product, count = 1) => {
			dispatch(cartActions.addCartProduct({ ...product, count }));
		},
		[dispatch]
	);

	return { addProductToCart };
};
