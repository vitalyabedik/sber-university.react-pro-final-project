import { useState } from 'react';
import classNames from 'classnames';
import { Counter } from '../../../shared/ui/Counter';
import { Button } from '../../../shared/ui/Button';
import { useAddToCart } from '../../../shared/hooks/useAddToCart';

type ProductCartCounterProps = {
	product: Product;
};

export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { addProductToCart } = useAddToCart();
	const [count, setCount] = useState(1);

	return (
		<div className={classNames('product__btn-wrap')}>
			<Counter count={count} onChange={setCount} />
			<Button onClick={() => addProductToCart(product, count)}>
				В корзину
			</Button>
		</div>
	);
};
