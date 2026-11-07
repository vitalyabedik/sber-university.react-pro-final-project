import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { CardList } from '../../../widgets/CardList';
import { InfiniteScrollLoader, useProducts } from '../../../features/products';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error, refetch } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				products={products}
				isLoading={isLoading}
				isError={isError}
				error={error}
				refetch={refetch}
			/>
			<InfiniteScrollLoader />
		</>
	);
});
