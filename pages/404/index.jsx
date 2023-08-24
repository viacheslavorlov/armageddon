import Link from 'next/link';
import cls from './404.module.css';

export default function Error() {
	return (
		<div>
			<h1>404 - Page Not Found</h1>
			<Link className={cls.link} href={'/'}>Back to main page</Link>
		</div>
	);
}
