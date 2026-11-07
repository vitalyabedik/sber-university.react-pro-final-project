import { useCallback, useMemo } from 'react';

export const useCartTotals = (products: CartProduct[]) => {
	const totals = useMemo(
		() => ({
			allPrice: products.reduce((acc, p) => p.price * p.count + acc, 0),
			allDiscount: products.reduce((acc, p) => acc + p.discount * p.count, 0),
		}),
		[products]
	);

	const handleSubmitCart = useCallback(() => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
	}, [products]);

	return { totals, handleSubmitCart };
};
