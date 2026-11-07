import s from './ProfilePage.module.css';
import classNames from 'classnames';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';

export const ProfilePage = WithProtection(() => {
	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])}>
				<div className={s['form__row']}>
					<Input
						name='name'
						id='name'
						type='text'
						placeholder='Введите ваше имя'
					/>
					<Input
						name='about'
						id='about'
						type='text'
						placeholder='Описание профессии'
					/>
				</div>
				<div className={s['form__row']}>
					<Input
						name='avatar'
						id='avatar'
						type='url'
						placeholder='Введите ссылку на аватарку'
					/>
					<Input name='email' id='email' type='text' placeholder='email' />
				</div>

				<Button type='submit' variant='secondary' className={s['maxContent']}>
					Сохранить
				</Button>
			</form>
			<h2 className={s['form__title']}>Изменить пароль</h2>
			<form className={classNames(s['form'], s['form'])}>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<Input
						name='password'
						id='password'
						type='password'
						placeholder='Пароль'
					/>
				</div>
				<Button type='submit' variant='secondary' className={s['maxContent']}>
					Сохранить
				</Button>
			</form>
		</>
	);
});
