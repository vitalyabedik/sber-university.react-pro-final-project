import { useCallback } from 'react';
import { CartItem } from './CartItem/CartItem';
import { cartActions } from '../../../shared/store/slices/cart';
import { useAppDispatch } from '../../../shared/store/utils';
import { CartProductCounter } from './CartProductCounter';

type CartProductItemProps = {
	product: CartProduct;
};

export const CartProductItem = ({ product }: CartProductItemProps) => {
	const dispatch = useAppDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);

	return (
		<CartItem
			id={id}
			name={name}
			image={images}
			price={price}
			discount={discount}
			onDelete={handleDelete}>
			<CartProductCounter productId={id} />
		</CartItem>
	);
};
