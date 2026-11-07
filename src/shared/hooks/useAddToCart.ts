import { cartActions } from '../store/slices/cart';
import { useAppDispatch } from '../store/utils';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const addProductToCart = (product: Product, count = 1) => {
		dispatch(cartActions.addCartProduct({ ...product, count }));
	};

	return { addProductToCart };
};
