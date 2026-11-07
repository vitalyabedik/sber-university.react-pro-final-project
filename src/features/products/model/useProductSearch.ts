import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useAppDispatch } from '../../../shared/store/utils';
import { productsActions } from '../../../shared/store/slices/products';

const QUERY_SEARCH_PHRASE = 'q';

export const useProductSearch = () => {
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	const searchValue = searchParams.get(QUERY_SEARCH_PHRASE) ?? '';

	const setSearchValue = useCallback(
		(value: string) => {
			if (value) {
				searchParams.set(QUERY_SEARCH_PHRASE, value);
			} else {
				searchParams.delete(QUERY_SEARCH_PHRASE);
			}

			setSearchParams(searchParams);
		},
		[searchParams, setSearchParams]
	);

	const optimizedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		dispatch(productsActions.setSearchText(optimizedValue));
	}, [optimizedValue, dispatch]);

	return {
		searchValue,
		setSearchValue,
	};
};
