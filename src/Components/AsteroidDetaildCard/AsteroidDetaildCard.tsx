import Image from 'next/image';
import Link from 'next/link';
import { classNames} from '../../helpers/classNames';
import {findClosestDate} from '../../helpers/findClosestDate';
import {APIResponseSingleAsteroidI} from '../../Model/APIRespoyseSigleAsteroid';
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
        nasa_jpl_url,
    } = asteroid
    const closestDate = findClosestDate(close_approach_data)

    return (
        <div className={classNames(cls.AsteroidDetailedCard, className)}>
            <h2 className={cls.name}> Астероид: {name}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.diameter}>
                    <div>Максимальный диаметр: Ø {Math.round(estimated_diameter.meters.estimated_diameter_max)} м</div>
                </div>
            </div>
            <div className={cls.closestDate}>Ближайшая дата подлета: {closestDate}</div>
            <div className={cls.hazard}>
                {is_potentially_hazardous_asteroid && <Image src={'/warning.svg'} alt={'Опасен'} width={130} height={30}/>}
            </div>

        </div>
    );
};

export const AsteroidDetaildCard = memo(AsteroidDetailed)
