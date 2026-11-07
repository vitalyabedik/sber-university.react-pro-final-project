import { useCallback } from 'react';
import { Search } from '../../../shared/ui/Search/ui/Search';
import { useProductSearch } from '../model/useProductSearch';

export const ProductSearch = () => {
	const { searchValue, setSearchValue } = useProductSearch();

	const handleChange = useCallback(
		(value: string) => setSearchValue(value),
		[setSearchValue]
	);

	return <Search value={searchValue} onChange={handleChange} />;
};
