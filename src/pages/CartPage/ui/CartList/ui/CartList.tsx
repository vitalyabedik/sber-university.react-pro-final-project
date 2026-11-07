import { CartItem } from '../../CartItem';
import s from '../../CartPage.module.css';
import classNames from 'classnames';

type CartListProps = {
	products: CartProduct[];
};
export const CartList = ({ products }: CartListProps) => {
	return (
		<div className={classNames(s['cart-list'])}>
			{products.map((p) => (
				<CartItem product={p} key={p.id} />
			))}
		</div>
	);
};
