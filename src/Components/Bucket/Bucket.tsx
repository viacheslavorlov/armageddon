import Link from 'next/link';
import {memo, useEffect, useState} from 'react';
import {classNames} from '../../helpers/classNames';
import {useWindowSize} from '../../hooks/useWindowSize';
import {DistanceType} from '../../Model/DistanceType';
import cls from './Bucket.module.css';

interface BucketPrors {
    className?: string;
    selected: string[];
    distanceType: DistanceType
}

const BucketComponent = (props: BucketPrors) => {
    const {
        className, selected, distanceType
    } = props;
    const [width, height] = useWindowSize()
    const [mobile, setMobile] = useState(width <= height);

    const ending = (num: number) => {
        const str = String(num)
        switch (str[str.length - 1]) {
            case '1':
                return '';
            case '2':
                return 'а';
            case '3':
                return 'а';
            case '4':
                return 'а'
            default:
                return 'ов';
        }
    };

    useEffect(() => {
        setMobile(width <= height)
    }, [height, width])


    return (
        <div className={classNames(className, (mobile || width < 880) ? cls.mobile : cls.Bucket)}>
            <div>
                <h3 className={cls.header}>Корзина</h3>
                <div className={cls.info}>
                    {`${selected.length} астероид${ending(selected.length)}`}
                </div>
            </div>

            <Link className={cls.button} href={{pathname: 'SentData', query: {selected, distanceType}}}>Отправить</Link>
        </div>
    );
};

export const Bucket = memo(BucketComponent);
