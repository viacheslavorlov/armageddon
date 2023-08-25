import Image from 'next/image';
import {memo, useState} from 'react';
import {findClosestDate} from '../../helpers/findClosestDate';
import {DistanceType} from '../../Model/DistanceType';
import {CustomLink} from '../CustomLink/CustomLink';
import cls from './AsteroidCard.module.css';

interface AsteroidInterface {
    asteroid: NearEarthObject;
    distanceType: DistanceType;
    onSelectAsteroid?: (id: string, isItemSelected: boolean) => void;
    isButtonNeeded?: boolean;
}

const Asteroid = (props: AsteroidInterface) => {
    const {distanceType, onSelectAsteroid, isButtonNeeded} = props;
    const {
        close_approach_data,
        estimated_diameter,
        is_potentially_hazardous_asteroid,
        id,
        name
    } = props.asteroid;
    const [selected, setSelected] = useState(false);
    const date = findClosestDate(close_approach_data)
    const distanceKm = close_approach_data[0].miss_distance.kilometers;
    const distanceLunar = close_approach_data[0].miss_distance.lunar;

    const onSelect = () => {
        setSelected(prevState => !prevState);
        onSelectAsteroid?.(id, selected);
    };

    const diameter = Math.round(estimated_diameter.meters.estimated_diameter_max)
    const distanceIdentifier = distanceType === 'km' ? ' км' : ' лунные орбиты';
    const distance = Math.round(Number(distanceType === 'km' ? distanceKm : distanceLunar)) + distanceIdentifier

    return (
        <section data-testid={'listitem'} className={cls.AsteroidCard}>
            <h2 className={cls.header}>{date}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.distance}>
                    <div data-testid={'distance-type'} className={cls.distanceText}>
                        {distance}
                    </div>
                    <Image className={cls.distanceArrow} src={'/Arrow.svg'} width={130} height={5} alt={'стрелка'}/>
                </div>
                <Image
                    src={'/asteroid.png'}
                    alt={'астероид'}
                    height={diameter >= 100 ? 40 : 24}
                    width={diameter >= 100 ? 36 : 22}/>
                <div className={cls.AsteroidName}>
                    <CustomLink href={`/asteroid-page/${id}`} label={name} className={cls.name}/>
                    <div>Ø {diameter} м</div>
                </div>

            </div>
            <div className={cls.bottomCard}>
                {isButtonNeeded && <button
                    onClick={onSelect}
                    className={cls.button}>
                    {selected ? 'В КОРЗИНЕ' : 'ЗАКАЗАТЬ'}
                </button>}
                {is_potentially_hazardous_asteroid &&
					<Image src={'/warning.svg'} width={67} height={20} alt={'Опасен'}/>}
            </div>
        </section>
    );
};

export const AsteroidCard = memo(Asteroid);
