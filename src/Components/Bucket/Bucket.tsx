
import {useRouter} from 'next/router';
import {memo, useEffect, useLayoutEffect, useState} from 'react';
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
    const router = useRouter()
    const [width, height] = useWindowSize()
    const [mobile, setMobile] = useState(width <= height);

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

    useLayoutEffect(() => {
        setMobile(width <= height)
    }, [height, width])

    const onSentAsteroids = () => {
        router.push('SentData', {
            pathname: 'SentData',
            query: {
                distanceType: distanceType,
                selected: selected.join(',')
            },
        })
    }

    return (
        <div className={classNames(className, (mobile || width < 880) ? cls.mobile : cls.Bucket)}>
            <div>
                <h3 className={cls.header}>Корзина</h3>
                <div className={cls.info}>
                    {selected.length} астероид{ending(selected.length)}
                </div>
            </div>

            <button onClick={onSentAsteroids} className={cls.button}>Отправить</button>
        </div>
    );
};

export const Bucket = memo(BucketComponent);
