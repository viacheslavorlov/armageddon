## Документация для компонента SentData

Этот документ описывает компонент SentData, который отображает данные о выбранных астероидах после отправки заказа.

### Импорты

```typescript jsx
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
```

### Компонент SentData

```typescript jsx
interface SentDataPrors {
    className?: string;
}

const SentData = (props: SentDataPrors) => {
    const {className} = props;
    const [witdth, height] = useWindowSize();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');
    const {query} = useRouter();
    const {distanceType, selected} = query;
    const [selectedAsteroids, setSelectedAsteroids] = useState<APIResponseSingleAsteroidI[]>([]);

    const fetchResult = async () => {
        try {
            const result = await axios.get<APIResponseSingleAsteroidI>(
                `api/fetchSingleAsteroid?id=${selected}`
            );
            setSelectedAsteroids([result.data]);
            setIsLoading(false);
        } catch (e) {
            setIsError(e.message);
        }
    };

    const mobile = witdth <= height || witdth < 1000;

    useEffect(() => {
        if (Array.isArray(selected)) {
            const promises = selected?.map((id: string) =>
                axios.get<APIResponseSingleAsteroidI>(`api/fetchSingleAsteroid?id=${id}`)
            );
            Promise.all(promises)
                .then((results) => {
                    setSelectedAsteroids(results.map((item) => item.data));
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
            <ErrorBoundary>
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
```

### Описание компонента

Компонент SentData отображает данные о выбранных астероидах после отправки заказа.

#### Пропсы

- `className?: string`  - дополнительный класс для стилизации компонента.

#### Стейты

- `witdth: number`  - ширина окна браузера.
- `height: number`  - высота окна браузера.
- `isLoading: boolean`  - флаг, указывающий, выполняется ли загрузка данных.
- `isError: string`  - сообщение об ошибке.
- `selectedAsteroids: APIResponseSingleAsteroidI[]`  - массив объектов, содержащих информацию о выбранных астероидах.

#### Хуки

- `useWindowSize()` : хук для получения размеров окна браузера.

#### Методы

- `fetchResult()` : функция для получения данных о выбранных астероидах.
- `useEffect()` : выполняет запрос данных при загрузке компонента.

#### Интерфейс

Компонент SentData отображает список выбранных астероидов с информацией о них. Он также отображает индикатор загрузки,
если данные еще не загрузились. 
