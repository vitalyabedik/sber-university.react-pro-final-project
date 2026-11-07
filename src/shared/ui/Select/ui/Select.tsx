import { ChangeEvent } from 'react';

export interface SelectOption {
	title: string;
	value: string;
}

type SelectProps<T extends string> = {
	value: T;
	options: SelectOption[];
	onChange: (value: T) => void;
};

export const Select = <T extends string>({
	value,
	options,
	onChange,
}: SelectProps<T>) => {
	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value as T);
	};

	return (
		<select value={value} onChange={handleSelect}>
			{options.map((p) => (
				<option key={p.title} value={p.value}>
					{p.title}
				</option>
			))}
		</select>
	);
};
