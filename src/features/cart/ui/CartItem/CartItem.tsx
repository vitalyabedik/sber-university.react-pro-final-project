import { ReactComponent as TrashIcon } from '../../../../shared/assets/icons/trash.svg';
import { Link } from 'react-router-dom';
import s from './CartItem.module.css';
import classNames from 'classnames';
import { ReactNode } from 'react';

type CartItemProps = {
	id: string;
	name: string;
	image: string;
	price: number;
	discount: number;
	children?: ReactNode;
	onDelete: () => void;
};

export const CartItem = ({
	id,
	name,
	image,
	price,
	discount,
	children,
	onDelete,
}: CartItemProps) => {
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={image}
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
							{children}

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
						<button
							type='button'
							className={classNames(s['cart-item__bnt-trash'])}
							onClick={onDelete}>
							<TrashIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
