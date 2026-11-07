import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from './../../../assets/icons/like.svg';
import classNames from 'classnames';

type TLikeButtonProps = {
	isActive: boolean;
	onToggle: () => void;
	label?: string;
	className?: string;
};

export const LikeButton = ({
	isActive,
	onToggle,
	label,
	className,
}: TLikeButtonProps) => {
	return (
		<button
			type='button'
			aria-label={label}
			aria-pressed={isActive}
			className={classNames(s['card__favorite'], className, {
				[s['card__favorite_is-active']]: isActive,
			})}
			onClick={onToggle}>
			<LikeSvg />
		</button>
	);
};
