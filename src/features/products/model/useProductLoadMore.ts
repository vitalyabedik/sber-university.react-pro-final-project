import { useCallback, useLayoutEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import { useProducts } from './useProducts';
import {
	productsActions,
	productsSelectors,
} from '../../../shared/store/slices/products';

export const useProductLoadMore = () => {
	const dispatch = useAppDispatch();

	const { products, isFetching, productsCount } = useProducts();

	const page = useAppSelector(productsSelectors.getPage);

	const ref = useRef<HTMLDivElement>(null);

	const isEndOfList = products.length >= productsCount;

	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(productsActions.setPage(page + 1));
		}
	}, [isEndOfList, isFetching, page, dispatch]);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;

		if (!isEndOfList && products.length) {
			const options: IntersectionObserverInit = { threshold: 0.5 };
			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreProducts();
				}
			};
			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer?.disconnect();
		};
	}, [fetchMoreProducts, isEndOfList, products.length]);

	return { ref, isEndOfList, isFetching };
};
