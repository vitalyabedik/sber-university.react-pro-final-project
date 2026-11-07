import { Counter } from '../../../shared/ui/Counter';
import { useCartProduct } from '../model/useCartProduct';

type CartProductCounterProps = {
	productId: string;
};

export const CartProductCounter = ({ productId }: CartProductCounterProps) => {
	const { count, changeCount, min, max } = useCartProduct(productId);

	return (
		<Counter count={count || min} onChange={changeCount} min={min} max={max} />
	);
};
