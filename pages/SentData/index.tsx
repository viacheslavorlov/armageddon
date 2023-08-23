import {useRouter} from 'next/router';
import {AsteroidList} from '../../src/Components/AsteroidLIst/AsteroidList';
import {SELECTED_ASTEROIDS} from '../../src/consts/localStorageKeys';
import { classNames} from '../../src/helpers/classNames';
import {DistanceType} from '../../src/Model/DistanceType';
import cls from './SentData.module.css';
import {memo, useEffect, useState} from 'react';

interface SentDataPrors {
    className?: string;
}

const SentData = memo((props: SentDataPrors) => {
    const {
        className
    } = props;
    const router = useRouter()
    const {distanceType} = router.query
    const [selectedAsteroids, setSelectedAsteroids] = useState([]);

    useEffect(() => {
        const asteridsIds = localStorage.getItem(SELECTED_ASTEROIDS)
    }, [])

    return (
        <main className={classNames(cls.SentData, className)}>
            <h2 className={cls.header}>Заказ отправлен!</h2>
            <AsteroidList asteroids={} distanceType={distanceType as DistanceType}/>
        </main>
    );
});

export default SentData
