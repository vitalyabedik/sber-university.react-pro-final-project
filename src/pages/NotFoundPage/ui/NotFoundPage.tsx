import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';
import s from './NotFoudPage.module.css';

export const NotFoundPage = () => {
	return (
		<div className={s.NotFoundPage}>
			<h1>Страница на найдена</h1>
			<Link to='/'>
				<Button>Перейти на главную</Button>
			</Link>
		</div>
	);
};
