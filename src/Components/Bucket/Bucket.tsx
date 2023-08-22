import {memo, useEffect, useState} from 'react';
import {classNames} from '../../helpers/classNames';
import {useWindowSize} from '../../hooks/useWindowSize';
import cls from './Bucket.module.css';

interface BucketPrors {
    className?: string;
    selected: string[];
}

const BucketComponent = (props: BucketPrors) => {
    const {
        className, selected
    } = props;
    const [width, height] = useWindowSize()

    const ending = (num: number) => {
        const str = String(num)
        switch (str[str.length - 1]) {
            case '1':
                return '';
            case '2':
                return 'a';
            case '3':
                return 'а';
            case '4':
                return 'a'
            default:
                return 'ов';
        }
    };

    return (
        <div className={classNames(className, (width <= height || width < 900) ? cls.mobile : cls.Bucket)}>
            <div>
                <h3 className={cls.header}>Корзина</h3>
                <div className={cls.info}>
                    {selected.length} астероид{ending(selected.length)}
                </div>
            </div>

            <button className={cls.button}>Отправить</button>
        </div>
    );
};

export const Bucket = memo(BucketComponent);
