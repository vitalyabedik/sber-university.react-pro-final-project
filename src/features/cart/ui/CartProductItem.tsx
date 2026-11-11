import { memo, useCallback, useState } from 'react';
import { CartItem } from './CartItem/CartItem';
import { cartActions } from '../../../shared/store/slices/cart';
import { useAppDispatch } from '../../../shared/store/utils';
import { CartProductCounter } from './CartProductCounter';
import { Modal } from '../../../shared/ui/Modal';
import { Button } from '../../../shared/ui/Button';
import s from './DeleteProductModal.module.css';

type CartProductItemProps = {
	product: CartProduct;
};

export const CartProductItem = memo(({ product }: CartProductItemProps) => {
	const dispatch = useAppDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { id, name, images, price, discount } = product;

	const handleDelete = useCallback(() => {
		dispatch(cartActions.deleteCartProduct(id));
	}, [dispatch, id]);

	const handleOpenModal = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const handleConfirmDelete = useCallback(() => {
		setIsModalOpen(false);
		handleDelete();
	}, [handleDelete]);

	return (
		<>
			<CartItem
				id={id}
				name={name}
				image={images}
				price={price}
				discount={discount}
				onDelete={handleOpenModal}>
				<CartProductCounter productId={id} />
			</CartItem>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title='Удалить товар из корзины?'>
				<p className={s['delete-product__text']}>
					{`Товар «${name}» будет удалён из корзины.`}
				</p>
				<div className={s['delete-product__actions']}>
					<Button variant='secondary' onClick={handleCloseModal}>
						Отмена
					</Button>
					<Button onClick={handleConfirmDelete}>Удалить</Button>
				</div>
			</Modal>
		</>
	);
});

CartProductItem.displayName = 'CartProductItem';
