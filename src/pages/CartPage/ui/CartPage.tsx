import s from './CartPage.module.css';
import classNames from 'classnames';
import { useAppSelector } from '../../../shared/store/utils';
import { cartSelectors } from '../../../shared/store/slices/cart';
import { CartAmount, CartList, useCartTotals } from '../../../features/cart';

export const CartPage = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);
	const { totals, handleSubmitCart } = useCartTotals(products);

	if (!products.length) {
		return <h1 className='header-title'>Товаров нет корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> в корзине
				</div>
				<CartList products={products} />
				<CartAmount
					count={products.length}
					allPrice={totals.allPrice}
					allDiscount={totals.allDiscount}
					onSubmit={handleSubmitCart}
				/>
			</div>
		</div>
	);
};
