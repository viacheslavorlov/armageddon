import axios from 'axios';
import type {NextPage} from 'next';
import Head from 'next/head';
import {memo, useCallback, useEffect, useState} from 'react';
import {AsteroidList} from '../src/Components/AsteroidLIst/AsteroidList';
import {Bucket} from '../src/Components/Bucket/Bucket';
import ErrorBoundary from '../src/Components/ErrorBoundary/ErrorBoundary';
import {Loader} from '../src/Components/Loader/Loader';
import {increaseDateByDay} from '../src/helpers/increasDateByDay';
import {DistanceType} from '../src/Model/DistanceType';
import cls from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [content, setContent] = useState<NearEarthObject[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [startDate, setStartDate] = useState(
        new Date().toLocaleDateString().split('.').reverse().join('-')
    );
    const [selected, setSelected] = useState<string[]>([]);

    const [distanceType, setDistanceType] = useState<DistanceType>('km');

    const onChangeDistanceType = useCallback((distanceType: DistanceType) => {
        setDistanceType(distanceType);
    }, []);

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const response = await axios.get(
                `api/getData?start_date=${startDate}&end_date=${startDate}`
            );
            console.log('result', response.data);
            setContent(response.data.reverse());
        } catch (e: any) {
            console.log(e.message);
        }
        setIsFetching(false);
    };

    const fetchDataByScroll = async (start: string) => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const innerHeight = window.innerHeight;

        if (scrollHeight - (scrollTop + innerHeight) <= 350 && !isFetching) {
            console.log('scroll');
            setIsFetching(true);
            const newStartDateString = increaseDateByDay(start, 1);
            const response = await axios.get(
                `api/getData?start_date=${newStartDateString}&end_date=${newStartDateString}`
            );
            console.log('result', response.data);
            setContent((prevState) => [...prevState, ...response.data.reverse()]);
            setStartDate(newStartDateString);
            setIsFetching(false);
        }
    };

    const onSelectAsteroid = useCallback((id: string, isItemSelect: boolean) => {
        if (!isItemSelect) {
            setSelected(prevState => [...prevState, id]);
        } else {
            setSelected(prevState => prevState.filter(item => item !== id));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => fetchDataByScroll(startDate);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchDataByScroll, startDate]);
    return (
        <div className={cls.container}>
            <Head>
                <title>Armageddon</title>
                <meta name="description" content="Квартирка тестовое задание"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={cls.main}>
                <ErrorBoundary message={'Ошибка получения данных с сервера'}>
                    <AsteroidList
                        buttonsNeeded
                        label={'Ближайшие подлеты астероидов'}
                        onChangeDistanceType={onChangeDistanceType}
                        distanceType={distanceType}
                        onSelect={onSelectAsteroid}
                        asteroids={content}
                    />
                </ErrorBoundary>
                {isFetching && <Loader className={cls.loader}/>}
            </main>
            <Bucket distanceType={'lunar'} className={cls.bucket} selected={selected}/>
        </div>
    );
};

export default memo(Home);
