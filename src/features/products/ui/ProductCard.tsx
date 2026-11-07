import { memo } from 'react';
import { Card } from '../../../shared/ui/Card';
import { selectIsProductInCart } from '../../../entities/cart';
import { useAppSelector } from '../../../shared/store/utils';
import { ProductLikeButton } from './ProductLikeButton';
import { AddToCartButton, CartProductCounter } from '../../cart';

type ProductCardProps = {
	product: Product;
};

export const ProductCard = memo(({ product }: ProductCardProps) => {
	const { id, name, images, price, discount, tags } = product;
	const isProductInCart = useAppSelector(selectIsProductInCart(id));

	return (
		<Card
			id={id}
			name={name}
			image={images}
			price={price}
			discount={discount}
			tags={tags}>
			<ProductLikeButton product={product} />
			{isProductInCart ? (
				<CartProductCounter productId={id} />
			) : (
				<AddToCartButton product={product} />
			)}
		</Card>
	);
});

ProductCard.displayName = 'ProductCard';
