import { useState } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '../../../../shared/ui/Rating';
import { Input } from '../../../../shared/ui/Input';
import { Button } from '../../../../shared/ui/Button';

export const ReviewForm = () => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);

	const handleClick = () => {
		console.log('Отправка: ', { reviewText, rating });
	};

	return (
		<form className={s['form']}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<Input
				multiline
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={setReviewText}
			/>
			<Button
				type='submit'
				className={classNames(s['form__btn'])}
				onClick={handleClick}>
				Отправить отзыв
			</Button>
		</form>
	);
};
