import axios from 'axios';
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

const SentData = (props: SentDataPrors) => {
    const {
        className
    } = props;
    const router = useRouter()
    const {distanceType} = router.query
    const [selectedAsteroids, setSelectedAsteroids] = useState([]);

    useEffect(() => {
        const asteridsIds = JSON.parse(localStorage.getItem(SELECTED_ASTEROIDS))
        asteridsIds.forEach(async (id) => {
            const response = await axios.get(`api/fetchSingleAsteroid?id=${id}`)
            await setSelectedAsteroids(prevState => [...prevState, response.data])
        })
    }, [])

    return (
        <main className={classNames(cls.SentData, className)}>
            <h2 className={cls.header}>Заказ отправлен!</h2>
            <AsteroidList asteroids={selectedAsteroids} distanceType={distanceType as DistanceType}/>
        </main>
    );
};

export default SentData
