import { useActionState, useState } from 'react';
import { toast } from 'react-toastify';
import {
	IErrorResponse,
	useLeaveReviewMutation,
} from '../../../shared/store/api/productsApi';

type ReviewFormState = {
	text: string;
	rating: number;
	error: string;
};

const initialReviewFormState: ReviewFormState = {
	text: '',
	rating: 0,
	error: '',
};

const getReviewFormFields = (formData: FormData) => ({
	text: String(formData.get('text') || '').trim(),
	rating: Number(formData.get('rating') || 0),
});

export const useReviewForm = (productId: string) => {
	const [leaveReview] = useLeaveReviewMutation();

	const [text, setText] = useState(initialReviewFormState.text);
	const [rating, setRating] = useState(initialReviewFormState.rating);

	const submitReview = async (
		_state: ReviewFormState,
		formData: FormData
	): Promise<ReviewFormState> => {
		const fields = getReviewFormFields(formData);

		if (!fields.text) {
			return { ...fields, error: 'Напишите текст отзыва' };
		}

		const { error } = await leaveReview({ id: productId, ...fields });

		if (error) {
			return { ...fields, error: (error as IErrorResponse)?.data?.message };
		}

		setText(initialReviewFormState.text);
		setRating(initialReviewFormState.rating);
		toast.success('Отзыв отправлен');

		return initialReviewFormState;
	};

	const [state, submitAction, isPending] = useActionState(
		submitReview,
		initialReviewFormState
	);

	return {
		state,
		submitAction,
		isPending,
		text,
		setText,
		rating,
		setRating,
	};
};
