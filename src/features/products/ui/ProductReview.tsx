import { ReviewList } from './ReviewList';
import { ReviewForm } from './ReviewForm/ReviewForm';

type ProductReviewProps = {
	product: Product;
};

export const ProductReview = ({ product }: ProductReviewProps) => {
	return (
		<ReviewList
			reviews={product.reviews}
			title={`Отзыв о товаре ${product.name}`}>
			<ReviewForm />
		</ReviewList>
	);
};
