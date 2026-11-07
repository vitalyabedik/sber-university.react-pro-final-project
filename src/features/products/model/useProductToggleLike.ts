import { toast } from 'react-toastify';
import { useAppSelector } from '../../../shared/store/utils';
import { userSelectors } from '../../../shared/store/slices/user';
import {
	IErrorResponse,
	useDeleteLikeProductMutation,
	useSetLikeProductMutation,
} from '../../../shared/store/api/productsApi';
import { isLiked } from '../../../entities/product';
import { selectCurrentUserId } from '../../../entities/user';

export const useProductToggleLike = (product: Product) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const userId = useAppSelector(selectCurrentUserId);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = isLiked(product.likes, userId);

	const toggleLike = async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}
		let response;
		if (isLike) {
			response = await deleteLike({ id: `${product.id}` });
		} else {
			response = await setLike({ id: `${product.id}` });
		}

		if (response.error) {
			const error = response.error as IErrorResponse;
			toast.error(error.data.message);
		}
	};

	return { isLike, toggleLike };
};
