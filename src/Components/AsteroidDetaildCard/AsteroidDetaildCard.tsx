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
        nasa_jpl_url
    } = asteroid
    const closestDate = findClosestDate(close_approach_data)

    return (
        <div className={classNames(cls.AsteroidDetailedCard, className)}>
            <h2 className={cls.name}> Астероид: {name}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.distance}>
                    <div data-testid={'distance-type'} className={cls.distanceText}>
                        {Math.round(Number(distanceType === 'km' ? distanceKm : distanceLunar)) + distanceIdentifier}
                    </div>
                    <Image className={cls.distanceArrow} src={'/Arrow.svg'} width={130} height={5} alt={'стрелка'}/>
                </div>
                <Image src={'/asteroid.png'} alt={'астероид'} height={40} width={40}/>
                <div className={cls.AsteroidName}>
                    <Link href={`/asteroid-page/${id}`} className={cls.name}>{name}</Link>
                    <div>Ø {Math.round(estimated_diameter.meters.estimated_diameter_max)} м</div>
                </div>

            </div>
            <div className={cls.closestDate}>Ближайшая дата подлета: {closestDate}</div>

        </div>
    );
};

export const AsteroidDetaildCard = memo(AsteroidDetailed)
