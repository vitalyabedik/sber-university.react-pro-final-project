import classNames from 'classnames';
import s from './ReviewList.module.css';
import { Rating } from '../../../shared/ui/Rating';
import { ReactNode } from 'react';

type ReviewListProps = {
	reviews: Review[];
	title: string;
	children?: ReactNode;
};

export const ReviewList = ({ reviews, title, children }: ReviewListProps) => {
	return (
		<div className={classNames(s['product__reviews'])}>
			{reviews.map((review) => (
				<div className={s['review']} key={review.id}>
					<div className={s['review__header']}>
						<div className={s['review__name']}>{review.user.name}</div>
						<div className={s['review__date']}>
							{new Date(review.createdAt).toLocaleDateString('ru-RU')}
						</div>
					</div>
					<Rating rating={review.rating} />
					<p className={s['review__text']}>{review.text}</p>
				</div>
			))}

			<h2>{title}</h2>
			{children}
		</div>
	);
};
