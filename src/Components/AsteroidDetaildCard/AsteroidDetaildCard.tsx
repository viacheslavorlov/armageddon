import Image from 'next/image';
import Link from 'next/link';
import { classNames} from '../../helpers/classNames';
import {closestDistanceFinder} from '../../helpers/closestDistanceFinder';
import {findClosestDate} from '../../helpers/findClosestDate';
import {APIResponseSingleAsteroidI} from '../../Model/APIRespoyseSigleAsteroid';
import {AsteroidApproachDetails} from '../AsteroidAproachDetails/AsteroidAproachDetails';
import cls from './AsteroidDetaildCard.module.css';
import { memo } from 'react';

interface AsteroidDetailedCardPrors {
    className?: string;
    asteroid: APIResponseSingleAsteroidI
}

export const AsteroidDetailed = (props: AsteroidDetailedCardPrors) => {
    const {
        className, asteroid
    } = props;

    const {
        name, id,
        estimated_diameter,
        is_potentially_hazardous_asteroid,
        close_approach_data,
    } = asteroid
    const closestDate = findClosestDate(close_approach_data)
    const closestDistance = Math.round(Number(closestDistanceFinder(asteroid)))

    return (
        <div className={classNames(cls.AsteroidDetailedCard, className)}>
            <h2  className={cls.name}>{`Астероид: ${name}`}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.diameter}>
                    <div>Максимальный диаметр: Ø {Math.round(estimated_diameter.meters.estimated_diameter_max)} м</div>
                </div>
            </div>
            <div className={cls.closestDate}>Ближайшая дата подлета: {closestDate}</div>
            <div className={cls.hazard}>
                {is_potentially_hazardous_asteroid && <Image src={'/warning.svg'} alt={'Опасен'} width={130} height={30}/>}
            </div>
            <div>
                Расстояние до земли: {closestDistance} км
            </div>
            <Link className={cls.button} href={{pathname: '/SentData', query: {selected: id, distanceType: 'km'}}}>Уничтожить этот астероид</Link>
            {
                close_approach_data.map(item => <AsteroidApproachDetails key={item.epoch_date_close_approach} closeApproachData={item} distanceType={'km'} />)
            }
        </div>
    );
};

export const AsteroidDetaildCard = memo(AsteroidDetailed)
