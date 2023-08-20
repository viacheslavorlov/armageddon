import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useRef, useState} from 'react';
import {AsteroidList} from '../src/Components/AsteroidLIst/AsteroidList';
import {API_KEY} from '../src/consts/apiKey';
import cls from '../styles/Home.module.css';

const Home: NextPage = (props: ApiResponse) => {
    const [content, setContent] = useState<NearEarthObject[]>([]);
    const [visible, setVisible] = useState(false);
    const trigger = useRef<HTMLDivElement | null>(null);
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString()
        .split('.')
        .reverse()
        .join('-'));

    console.log(props);

    useEffect(() => {
        const increaseDateByWeek = () => {
            const newDate = new Date(startDate);
            newDate.setDate(newDate.getDate() + 1);
            setStartDate(newDate
                .toLocaleDateString()
                .split('.')
                .reverse()
                .join('-'));
        };
        const data = Object.values(props.near_earth_objects);
        const result = [];
        data.forEach(obj => result.push(...obj));
        setContent(result);
        increaseDateByWeek();
    }, [props.near_earth_objects]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${API_KEY}`);
            const data = await response.json();
            const data2 = Object.values(data.near_earth_objects).reverse();
            const result = [];
            console.log(data2);
            data2.forEach(obj => result.push(...obj));
            console.log('result', result);
            setContent((prevContent) => [...prevContent, ...result]);
            setVisible(false);
        };

        if (visible) {
            fetchData();
        }
    }, [startDate, visible]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            setVisible(entries[0].isIntersecting);
            console.log('intersection');
        });

        if (trigger.current) {
            observer.observe(trigger.current as Element);
        }

        return () => observer.unobserve(trigger.current as Element);
    }, []);

    return (
        <div className={cls.container}>
            <Head>
                <title>Armageddon</title>
                <meta name="description" content="Квартирка тестовое задание"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={'main'}>
                <AsteroidList asteroids={content}/>
                <div ref={trigger} className={'trigger'}></div>
            </main>
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    const today = new Date()
        .toLocaleDateString()
        .split('.')
        .reverse()
        .join('-');

    const tomor = new Date();
    tomor.setDate(tomor.getDate() + 1);
    const tomorrow = tomor.toLocaleDateString()
        .split('.')
        .reverse()
        .join('-');

    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${tomorrow}&api_key=${API_KEY}`);
    const data = await response.json();

    return {
        props: data
    };
};
