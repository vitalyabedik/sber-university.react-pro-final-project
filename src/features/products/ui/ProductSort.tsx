import { Select } from '../../../shared/ui/Select';
import { useProductSort } from '../model/useProductSort';

export const ProductSort = () => {
	const { sort, setSort, sortOptions } = useProductSort();

	return <Select value={sort} options={sortOptions} onChange={setSort} />;
};
