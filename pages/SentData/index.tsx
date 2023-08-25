import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {AsteroidList} from '../../src/Components/AsteroidLIst/AsteroidList';
import ErrorBoundary from '../../src/Components/ErrorBoundary/ErrorBoundary';
import {Footer} from '../../src/Components/Footer/Footer';
import {Loader} from '../../src/Components/Loader/Loader';
import {classNames} from '../../src/helpers/classNames';
import {useWindowSize} from '../../src/hooks/useWindowSize';
import {APIResponseSingleAsteroidI} from '../../src/Model/APIRespoyseSigleAsteroid';
import {DistanceType} from '../../src/Model/DistanceType';
import cls from './SentData.module.css';

interface SentDataPrors {
    className?: string;
}

const SentData = (props: SentDataPrors) => {
    const {
        className
    } = props;
    const [witdth, height] = useWindowSize();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');
    const {query} = useRouter();
    const {distanceType, selected} = query;
    const [selectedAsteroids, setSelectedAsteroids] = useState<APIResponseSingleAsteroidI[]>([]);

    const fetchResult = async () => {
        try {
            const result = await axios.get<APIResponseSingleAsteroidI>(`api/fetchSingleAsteroid?id=${selected}`);
            setSelectedAsteroids([result.data]);
            setIsLoading(false);
        } catch (e) {
            setIsError('Ошибка при получении данных');
        }
    };

    const mobile = witdth <= height || witdth < 1000;

    useEffect(() => {

        if (Array.isArray(selected)) {
            const promises = selected?.map((id: string) => axios.get<APIResponseSingleAsteroidI>(`api/fetchSingleAsteroid?id=${id}`));
            Promise.all(promises)
                .then((results) => {
                    // @ts-ignore
                    setSelectedAsteroids(results.map(item => item.data));
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsError(error.message);
                });
        } else {
            fetchResult();
        }
    }, []);

    return (

            <main className={classNames(cls.SentData, className, mobile ? cls.mobile : '')}>
                <ErrorBoundary message={isError}>
                <AsteroidList
                    buttonsNeeded={false}
                    label={'Заказ отправлен!'}
                    asteroids={selectedAsteroids}
                    distanceType={distanceType as DistanceType}
                />
                </ErrorBoundary>
                {isLoading && <Loader/>}
                <Footer className={cls.footer}/>
            </main>

    );
};

export default SentData;
