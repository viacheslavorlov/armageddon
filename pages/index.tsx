import axios from 'axios';
import type {NextPage} from 'next';
import Head from 'next/head';
import {memo, useEffect, useState} from 'react';
import {AsteroidList} from '../src/Components/AsteroidLIst/AsteroidList';
import {Loader} from '../src/Components/Loader/Loader';
import cls from '../styles/Home.module.css';

const Home: NextPage = () => {
    const [content, setContent] = useState<NearEarthObject[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [startDate, setStartDate] = useState(
        new Date().toLocaleDateString().split('.').reverse().join('-')
    );

    const increaseDateByDay = (dateString: string, day: number = 1) => {
        const newDate = new Date(dateString);
        newDate.setDate(newDate.getDate() + day);
        return newDate.toLocaleDateString().split('.').reverse().join('-');
    };

    const fetchData = async () => {
        setIsFetching(true);
        const endDate = increaseDateByDay(startDate)
        const response = await axios.get(
            `api/getData?start_date=${startDate}&end_date=${endDate}`
        );
        const result = [];
        response.data.forEach((item) => result.push(...item));
        console.log('result', result);
        setContent(result.reverse());
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
            const result = [];
            response.data.forEach((item) => result.push(...item));
            console.log('result', result);
            setContent((prevState) => [...prevState, ...result.reverse()]);
            setStartDate(newStartDateString);
            setIsFetching(false);
        }
    };

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
            <main className={'main'}>
                <AsteroidList asteroids={content}/>
                {isFetching && <Loader className={cls.loader}/>}
            </main>

        </div>
    );
};

export default memo(Home);
//
// export const getServerSideProps = async () => {
//     const today = new Date()
//         .toLocaleDateString()
//         .split('.')
//         .reverse()
//         .join('-');
//
//     const tomor = new Date();
//     tomor.setDate(tomor.getDate() + 1);
//     const tomorrow = tomor.toLocaleDateString()
//         .split('.')
//         .reverse()
//         .join('-');
//
//
//     const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${tomorrow}&api_key=${API_KEY}`);
//     const data = await response.json();
//
//     return {
//         props: data
//     };
// };
