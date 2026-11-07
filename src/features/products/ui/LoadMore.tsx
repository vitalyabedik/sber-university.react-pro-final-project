import { LoadMore } from '../../../shared/ui/LoadMore';
import { useProductLoadMore } from '../model/useProductLoadMore';

export const InfiniteScrollLoader = () => {
	const { ref, isEndOfList, isFetching } = useProductLoadMore();

	return (
		<LoadMore
			innerRef={ref}
			isFetching={isFetching}
			isEndOfList={isEndOfList}
		/>
	);
};
