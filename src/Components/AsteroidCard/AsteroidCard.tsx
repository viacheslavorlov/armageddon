import Image from 'next/image';
import {DistanceType} from '../../Model/DistanceType';
import cls from './AsteroidCard.module.css';
import {memo, useState} from 'react';
interface AsteroidInterface {
    asteroid: NearEarthObject
    distanceType: DistanceType
}


const Asteroid = (props: AsteroidInterface) => {
    const distanceType = props.distanceType
    const {
        close_approach_data,
        estimated_diameter,
        is_potentially_hazardous_asteroid,
        id,
        name
    } = props.asteroid;
    const [selected, setSelected] = useState(false);
    const date = new Date(close_approach_data[0].close_approach_date)
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    const distanceKm = close_approach_data[0].miss_distance.kilometers
    const distanceLunar = close_approach_data[0].miss_distance.lunar

    const onSelectAsteroid = () => {
        setSelected(true)
    }

    const distanceIdentifier = distanceType === 'km' ? ' км' : ' лунные орбиты'

    return (
        <section className={cls.AsteroidCard}>
            <h2 className={cls.header}>{date}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.distance}>
                    <div className={cls.distanceText}>
                        {Math.round(Number(distanceType === 'km' ? distanceKm : distanceLunar)) + distanceIdentifier}
                    </div>
                    <Image className={cls.distanceArrow} src={'/Arrow.svg'} width={130} height={5} alt={'стрелка'}/>
                </div>
                <Image src={'/asteroid.png'} alt={'астероид'} height={40} width={40} />
                <div className={cls.AsteroidName}>
                    <div className={cls.name}>{name}</div>
                    <div>Ø {Math.round(estimated_diameter.meters.estimated_diameter_max)} м</div>
                </div>

            </div>
            <div className={cls.bottomCard}>
                <button
                    onClick={onSelectAsteroid}
                    className={cls.button}>
                    {selected ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
                </button>
                {is_potentially_hazardous_asteroid && <Image src={'/warning.svg'} width={67} height={20} alt={'Опасен'}/>}
            </div>
        </section>
    );
};

export const AsteroidCard = memo(Asteroid)
