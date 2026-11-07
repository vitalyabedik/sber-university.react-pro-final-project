import { useCallback } from 'react';
import { cartActions } from '../../../shared/store/slices/cart';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import { selectCartProductById } from '../../../entities/cart';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCartProduct = (productId: string) => {
	const dispatch = useAppDispatch();
	const cartProduct = useAppSelector(selectCartProductById(productId));

	const changeCount = useCallback(
		(count: number) => {
			dispatch(cartActions.setCartProductCount({ id: productId, count }));
		},
		[dispatch, productId]
	);

	return { ...cartProduct, changeCount, min: MIN_COUNT, max: MAX_COUNT };
};
