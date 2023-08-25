## Документация для страницы Home

Этот документ описывает компонент  `Home` , который является главной страницей приложения.

### Импорты

```tsx
import axios from 'axios';
import type {NextPage} from 'next';
import Head from 'next/head';
import {memo, useCallback, useEffect, useState} from 'react';
import {AsteroidList} from '../src/Components/AsteroidLIst/AsteroidList';
import {Bucket} from '../src/Components/Bucket/Bucket';
import {Loader} from '../src/Components/Loader/Loader';
import {increaseDateByDay} from '../src/helpers/increasDateByDay';
import {DistanceType} from '../src/Model/DistanceType';
import cls from '../styles/Home.module.css';
```

### Компонент Home

```tsx
const Home: NextPage = () => {
    const [content, setContent] = useState<NearEarthObject[]>([]);
    const [isFetching, setIsFetching] = useState(false);
    const [startDate, setStartDate] = useState(
        new Date().toLocaleDateString().split('.').reverse().join('-')
    );
    const [selected, setSelected] = useState<string[]>([]);
    const [distanceType, setDistanceType] = useState<DistanceType>('km');

// Функция для изменения типа расстояния
    const onChangeDistanceType = (distanceType: DistanceType) => {
        setDistanceType(distanceType);
    };

// Функция для получения данных
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

// Функция для получения данных при скролле
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

// Функция для выбора астероидов
    const onSelectAsteroid = useCallback((id: string, isItemSelect: boolean) => {
        if (!isItemSelect) {
            setSelected((prevState) => [...prevState, id]);
        } else {
            setSelected((prevState) => prevState.filter((item) => item !== id));
        }
    }, [selected]);

// Получение данных при загрузке страницы
    useEffect(() => {
        fetchData();
    }, []);

// Получение данных при скролле
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
                <AsteroidList
                    buttonsNeeded
                    label={'Ближайшие подлеты астероидов'}
                    onChangeDistanceType={onChangeDistanceType}
                    distanceType={distanceType}
                    onSelect={onSelectAsteroid}
                    asteroids={content}
                />
                {isFetching && <Loader className={cls.loader}/>}
            </main>
            <Bucket distanceType={'lunar'} className={cls.bucket} selected={selected}/>
        </div>
    );
};

export default memo(Home);
```

### Описание компонента

Компонент  `Home`  представляет собой главную страницу приложения. Он отображает список ближайших астероидов и позволяет
выбирать астероиды для добавления в корзину.

#### Стейты

- `content: NearEarthObject[]`  - массив объектов, содержащих информацию о ближайших астероидах.
- `isFetching: boolean`  - флаг, указывающий, выполняется ли загрузка данных.
- `startDate: string`  - дата начала запроса данных в формате ГГГГ-ММ-ДД.
- `selected: string[]`  - массив идентификаторов выбранных астероидов.
- `distanceType: DistanceType`  - тип расстояния (километры или луны).

#### Методы

- `onChangeDistanceType(distanceType: DistanceType)` : функция для изменения типа расстояния.
- `fetchData()` : функция для получения данных о ближайших астероидах.
- `fetchDataByScroll(start: string)` : функция для получения дополнительных данных при скролле.
- `onSelectAsteroid(id: string, isItemSelect: boolean)` : функция для выбора астероида.

#### Жизненные циклы

- `useEffect()` 1 : выполняет запрос данных при загрузке страницы.
- `useEffect()` 2: отслеживает скролл страницы и выполняет запрос дополнительных данных при достижении определенного
  порога скролла.

#### Визуальный интерфейс

Компонент  `Home`  отображает список ближайших астероидов с возможностью выбора типа расстояния (километры или луны) и
добавления астероидов в корзину. Во время загрузки данных отображается индикатор загрузки.

### Примечания

Компонент  `Home`  использует стили из файла  `Home.module.css` . Убедитесь, что этот файл стилей доступен и содержит
необходимые стили для компонента.
