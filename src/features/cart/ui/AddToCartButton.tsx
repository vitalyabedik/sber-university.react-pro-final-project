import { memo, useCallback } from 'react';
import { useAddToCart } from '../../../shared/hooks/useAddToCart';
import { Button } from '../../../shared/ui/Button';

type AddToCartButtonProps = {
	product: Product;
	className?: string;
};

export const AddToCartButton = memo(
	({ product, className }: AddToCartButtonProps) => {
		const { addProductToCart } = useAddToCart();

		const handleAdd = useCallback(
			() => addProductToCart(product),
			[addProductToCart, product]
		);

		return (
			<Button onClick={handleAdd} className={className}>
				В корзину
			</Button>
		);
	}
);

AddToCartButton.displayName = 'AddToCartButton';
