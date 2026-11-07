import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { useProducts } from '../../../features/products';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { CardList } from '../../../widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const { isLoading, isError, products, error, refetch } = useProducts();

	return (
		<>
			<br />
			<ButtonBack />
			<CardListWithQuery
				title='Избранные'
				products={products}
				isLoading={isLoading}
				isError={isError}
				error={error}
				refetch={refetch}
			/>
		</>
	);
});
