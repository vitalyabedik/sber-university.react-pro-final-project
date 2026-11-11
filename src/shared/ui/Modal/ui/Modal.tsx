import { ReactNode, useEffect, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children?: ReactNode;
	className?: string;
};

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	className,
}: ModalProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) return;

		triggerRef.current = document.activeElement as HTMLElement | null;
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;

			onClose();
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			triggerRef.current?.focus();
			triggerRef.current = null;
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const modalRoot = document.getElementById('modal-root') || document.body;

	const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
		if (event.target !== event.currentTarget) return;

		onClose();
	};

	return createPortal(
		<div
			className={s['modal__overlay']}
			role='presentation'
			onClick={handleOverlayClick}>
			<div
				className={classNames(s['modal'], className)}
				role='dialog'
				aria-modal='true'
				aria-label={title}>
				<button
					ref={closeButtonRef}
					type='button'
					className={s['modal__close']}
					aria-label='Закрыть модальное окно'
					onClick={onClose}>
					<svg
						viewBox='0 0 24 24'
						width='24'
						height='24'
						fill='none'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M6 6L18 18M18 6L6 18'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</button>
				{title && <h2 className={s['modal__title']}>{title}</h2>}
				{children}
			</div>
		</div>,
		modalRoot
	);
};
