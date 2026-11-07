import {
	ChangeEvent,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
} from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	label?: string;
	multiline?: boolean;
	onChange?: (value: string) => void;
};

type TextareaProps = Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	'onChange'
> & {
	label?: string;
	multiline: true;
	onChange?: (value: string) => void;
};

export const Input = ({
	label,
	multiline,
	onChange,
	className,
	id,
	name,
	...props
}: InputProps | TextareaProps) => {
	const fieldId = id || name;
	const fieldClass = classNames(
		s['input'],
		{ [s['input_type_textarea']]: multiline },
		className
	);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		onChange?.(e.target.value);
	};

	const field = multiline ? (
		<textarea
			id={fieldId}
			name={name}
			className={fieldClass}
			onChange={handleChange}
			{...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
		/>
	) : (
		<input
			id={fieldId}
			name={name}
			className={fieldClass}
			onChange={handleChange}
			{...(props as InputHTMLAttributes<HTMLInputElement>)}
		/>
	);

	if (!label) return field;

	return (
		<label className={s['label']} htmlFor={fieldId}>
			{label}
			{field}
		</label>
	);
};
