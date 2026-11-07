import { ReactComponent as TrashIcon } from '../../../../../shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from '../../CartPage.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../../../shared/store/slices/cart';
import { CartCounter } from '../../../../../shared/ui/CartCounter';

type CartItemProps = {
	product: CartProduct;
};
export const CartItem = ({ product }: CartItemProps) => {
	const dispatch = useDispatch();
	const { id, name, images, price, discount } = product;

	const handleDelete = () => {
		dispatch(cartActions.deleteCartProduct(id));
	};
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<button className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon onClick={handleDelete} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
