import { useLocation } from 'react-router-dom';
import { userSelectors } from '../../../shared/store/slices/user';
import { useAppSelector } from '../../../shared/store/utils';
import { isLiked } from '../../../entities/product';
import { productsSelectors } from '../../../shared/store/slices/products';
import { useGetProductsQuery } from '../../../shared/store/api/productsApi';

export const useProducts = () => {
	const { pathname } = useLocation();

	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);

	const isFavoritesPage = pathname === '/favorites';
	const { isLoading, isError, error, data, isFetching, refetch } =
		useGetProductsQuery({
			searchText,
			sort,
			page,
			perPage: isFavoritesPage ? undefined : perPage,
		});

	let products = data?.products || [];

	const user = useAppSelector(userSelectors.getUser);

	if (isFavoritesPage) {
		products = products.filter((product) => isLiked(product.likes, user?.id));
	}

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		refetch,
		productsCount,
	};
};
