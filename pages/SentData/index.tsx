import axios from 'axios';
import {useRouter} from 'next/router';
import {AsteroidList} from '../../src/Components/AsteroidLIst/AsteroidList';
import {SELECTED_ASTEROIDS} from '../../src/consts/localStorageKeys';
import {classNames} from '../../src/helpers/classNames';
import {DistanceType} from '../../src/Model/DistanceType';
import cls from './SentData.module.css';
import {memo, useEffect, useLayoutEffect, useState} from 'react';
import {APIResponseSingleAsteroidI} from "../../src/Model/APIRespoyseSigleAsteroid";

interface SentDataPrors {
    className?: string;
}

const SentData = (props: SentDataPrors) => {
    const {
        className
    } = props;
    const {query} = useRouter()
    const {distanceType, selected} = query
    const [selectedAsteroids, setSelectedAsteroids] = useState<APIResponseSingleAsteroidI[]>([]);

    useEffect(() => {
        const asteridsIds = selected.split(',')
        console.log(asteridsIds)
        asteridsIds.forEach(async (id: string) => {
            const response = await axios.get<APIResponseSingleAsteroidI>(`api/fetchSingleAsteroid?id=${id}`)
            setSelectedAsteroids(prevState => [...prevState, response.data])
        })
    }, [])

    return (
        <main className={classNames(cls.SentData, className, cls.mobile)}>
            <AsteroidList
                buttonsNeeded={false}
                label={'Заказ отправлен'}
                asteroids={selectedAsteroids}
                distanceType={distanceType as DistanceType}
            />
        </main>
    );
};

export default SentData
