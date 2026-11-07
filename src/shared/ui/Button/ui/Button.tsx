import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	wide?: boolean;
};

export const Button = ({
	variant = 'primary',
	wide = false,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			className={classNames(
				s['button'],
				s[`button_type_${variant}`],
				{ [s['button_type_wide']]: wide },
				className
			)}
			{...props}
		/>
	);
};
