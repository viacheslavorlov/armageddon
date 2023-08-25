import Image from 'next/image';
import {memo} from 'react';
import {DistanceType} from '../../Model/DistanceType';
import cls from './AsteroidApproachDetails.module.css';

interface AsteroidApproachInterface {
    closeApproachData: CloseApproachData;
    distanceType: DistanceType;
    isButtonNeeded?: boolean;
}

const AsteroidApproach = (props: AsteroidApproachInterface) => {
    const {closeApproachData, distanceType, isButtonNeeded} = props;
    const {
        miss_distance,
        epoch_date_close_approach,
        orbiting_body,
        relative_velocity,
    } = closeApproachData;

    const date = new Date(epoch_date_close_approach)
        .toLocaleDateString('ru-Ru', {day: 'numeric', month: 'long', year: 'numeric'});
    const distanceKm = miss_distance.kilometers;
    const distanceLunar = miss_distance.lunar;
    const speed = `${relative_velocity.kilometers_per_hour} км/секунду`;

    const distanceIdentifier = distanceType === 'km' ? ' км' : ' лунные орбиты';
    const distance = Math.round(Number(distanceType === 'km' ? distanceKm : distanceLunar)) + distanceIdentifier;

    return (
        <section data-testid={'listitem'} className={cls.AsteroidApproachDetails}>
            <h2 className={cls.header}>{date}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.distance}>
                    <div data-testid={'distance-type'} className={cls.distanceText}>
                        {distance}
                    </div>
                    <Image className={cls.distanceArrow} src={'/Arrow.svg'} width={130} height={5} alt={'стрелка'}/>
                </div>
                <div>
                    Скорость относительно земли: {speed}
                </div>
            </div>
        </section>
    );
};

export const AsteroidApproachDetails = memo(AsteroidApproach);
