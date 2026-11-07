import { SelectOption } from '../../../shared/ui/Select';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import {
	productsActions,
	productsSelectors,
} from '../../../shared/store/slices/products';

const SORT_OPTIONS: SelectOption[] = [
	{
		title: 'Дешевые',
		value: 'low-price',
	},
	{
		title: 'Дорогие',
		value: 'high-price',
	},
	{
		title: 'Новые',
		value: 'newest',
	},
	{
		title: 'Старые',
		value: 'oldest',
	},
];

export const useProductSort = () => {
	const dispatch = useAppDispatch();

	const sort = useAppSelector(productsSelectors.getSort);

	const setSort = (newSort: Sort) => {
		dispatch(productsActions.setSort(newSort));
	};

	return { sort, setSort, sortOptions: SORT_OPTIONS };
};
