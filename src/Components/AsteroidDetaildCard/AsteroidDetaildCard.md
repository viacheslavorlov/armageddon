## Документация для компонента AsteroidDetaildCard

Этот документ описывает компонент AsteroidDetaildCard, который отображает карточку с подробной информацией об астероиде.

### Импорты

```jsx
import Image from 'next/image';
import Link from 'next/link';
import {memo} from 'react';
import {classNames} from '../../helpers/classNames';
import {closestDistanceFinder} from '../../helpers/closestDistanceFinder';
import {findClosestDate} from '../../helpers/findClosestDate';
import {APIResponseSingleAsteroidI} from '../../Model/APIRespoyseSigleAsteroid';
import {AsteroidApproachDetails} from '../AsteroidAproachDetails/AsteroidAproachDetails';
import cls from './AsteroidDetaildCard.module.css';
```

### Компонент AsteroidDetaildCard

```typescript jsx
interface AsteroidDetailedCardPrors {
    className?: string;
    asteroid: APIResponseSingleAsteroidI;
}

export const AsteroidDetailed = (props: AsteroidDetailedCardPrors) => {
    const {className, asteroid} = props;

    const {
        name,
        id,
        estimated_diameter,
        is_potentially_hazardous_asteroid,
        close_approach_data,
    } = asteroid;
    const closestDate = findClosestDate(close_approach_data);
    const closestDistance = Math.round(Number(closestDistanceFinder(asteroid)));

    return (
        <div className={classNames(cls.AsteroidDetailedCard, className)}>
            <h2 className={cls.name}>{`Астероид: ${name}`}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.diameter}>
                    <div>
                        Максимальный диаметр: Ø {Math.round(estimated_diameter.meters.estimated_diameter_max)} м
                    </div>
                </div>
            </div>
            <div className={cls.closestDate}>Ближайшая дата подлета: {closestDate}</div>
            <div className={cls.hazard}>
                {is_potentially_hazardous_asteroid && (
                    <Image src={'/warning.svg'} alt={'Опасен'} width={130} height={30}/>
                )}
            </div>
            <div>Расстояние до земли: {closestDistance} км</div>
            <Link
                className={cls.button}
                href={{pathname: '/SentData', query: {selected: id, distanceType: 'km'}}}
            >
                Уничтожить этот астероид
            </Link>
            <h2 className={cls.name}>Список сближений астероида с Землей</h2>
            {close_approach_data.map((item) => (
                <AsteroidApproachDetails
                    key={item.epoch_date_close_approach}
                    closeApproachData={item}
                    distanceType={'km'}
                />
            ))}
        </div>
    );
};

export const AsteroidDetaildCard = memo(AsteroidDetailed);
```

### Описание компонента

Компонент AsteroidDetaildCard отображает карточку с подробной информацией об астероиде.

#### Пропсы

- `className?: string`  - дополнительный класс для стилизации компонента.
- `asteroid: APIResponseSingleAsteroidI`  - объект, содержащий информацию об астероиде.

#### Визуальный интерфейс

Компонент AsteroidDetaildCard отображает следующую информацию об астероиде:

- Название астероида
- Максимальный диаметр астероида
- Ближайшая дата подлета астероида к Земле
- Индикатор опасности астероида, если он является потенциально опасным
- Расстояние астероида до Земли
- Кнопка для уничтожения астероида
- Список сближений астероида с Землей
