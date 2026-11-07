import classNames from 'classnames';
import { CartProductItem } from './CartProductItem';
import s from './CartList.module.css';

type CartListProps = {
	products: CartProduct[];
};

export const CartList = ({ products }: CartListProps) => {
	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartProductItem product={p} key={p.id} />
			))}
		</div>
	);
};
