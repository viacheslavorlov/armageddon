import Link from 'next/link';
import {memo} from 'react';
import cls from './Header.module.css';

interface HeaderPrors {
    className?: string;
}

const HeaderU = (props: HeaderPrors) => {
    const {
        className
    } = props;

    return (
        <div className={className + ' ' + cls.wrapper}>
            <Link className={cls.link} href={'/'}>
                <h1 className={cls.headerName}>ARMAGEDDON 2023</h1>
                <div>ООО “Команда им. Б. Уиллиса”.</div>
                <div>Взрываем астероиды с 1998 года.</div>
            </Link>
        </div>
    );
};

export const Header = memo(HeaderU);
