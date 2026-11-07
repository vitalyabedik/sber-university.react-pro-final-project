import s from './Counter.module.css';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

type CounterProps = {
	count: number;
	onChange: (count: number) => void;
	min?: number;
	max?: number;
};

export const Counter = ({
	count,
	onChange,
	min = 1,
	max = 99,
}: CounterProps) => {
	const clamp = (value: number) =>
		value > max ? max : value < min ? min : value;

	const handleDecrement = () => onChange(clamp(count - 1));
	const handleIncrement = () => onChange(clamp(count + 1));
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(clamp(+e.target.value));
	};

	return (
		<div className={classNames(s['button-count'])}>
			<button
				type='button'
				onClick={handleDecrement}
				className={classNames(s['button-count__minus'])}>
				-
			</button>
			<input
				onChange={handleSetCount}
				type='number'
				className={classNames(s['button-count__num'])}
				value={count}
			/>
			<button
				type='button'
				onClick={handleIncrement}
				className={classNames(s['button-count__plus'])}
				disabled={count >= max}>
				+
			</button>
		</div>
	);
};
