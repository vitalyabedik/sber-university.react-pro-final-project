import { LikeButton } from '../../../shared/ui/LikeButton';
import { useProductToggleLike } from '../model/useProductToggleLike';

type ProductLikeButtonProps = {
	product: Product;
	className?: string;
	label?: string;
};

export const ProductLikeButton = ({
	product,
	className,
	label,
}: ProductLikeButtonProps) => {
	const { isLike, toggleLike } = useProductToggleLike(product);

	return (
		<LikeButton
			isActive={isLike}
			onToggle={toggleLike}
			className={className}
			label={label}
		/>
	);
};
