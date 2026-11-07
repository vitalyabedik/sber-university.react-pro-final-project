import { useAddToCart } from '../../../shared/hooks/useAddToCart';
import { Button } from '../../../shared/ui/Button';

type AddToCartButtonProps = {
	product: Product;
	className?: string;
};

export const AddToCartButton = ({
	product,
	className,
}: AddToCartButtonProps) => {
	const { addProductToCart } = useAddToCart();

	return (
		<Button onClick={() => addProductToCart(product)} className={className}>
			В корзину
		</Button>
	);
};
