import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '../../../../shared/ui/Rating';
import { Input } from '../../../../shared/ui/Input';
import { Button } from '../../../../shared/ui/Button';
import { useReviewForm } from '../../model/useReviewForm';

type ReviewFormProps = {
	productId: string;
};

export const ReviewForm = ({ productId }: ReviewFormProps) => {
	const { state, submitAction, isPending, text, setText, rating, setRating } =
		useReviewForm(productId);

	return (
		<form action={submitAction} className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<input type='hidden' name='rating' value={rating} readOnly />
			<Input
				multiline
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={text}
				onChange={setText}
			/>
			{state.error && (
				<p role='alert' className={s['form__error']}>
					{state.error}
				</p>
			)}
			<Button
				type='submit'
				disabled={isPending}
				className={classNames(s['form__btn'])}>
				{isPending ? 'Отправляем…' : 'Отправить отзыв'}
			</Button>
		</form>
	);
};
