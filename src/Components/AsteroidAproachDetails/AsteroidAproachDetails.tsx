import Image from 'next/image';
import {memo} from 'react';
import {planetTranslator} from '../../helpers/platetTranslator';
import {DistanceType} from '../../Model/DistanceType';
import cls from './AsteroidApproachDetails.module.css';

interface AsteroidApproachInterface {
    closeApproachData: CloseApproachData;
    distanceType: DistanceType;
}

const AsteroidApproach = (props: AsteroidApproachInterface) => {
    const {closeApproachData, distanceType} = props;
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
    const speed = `${Math.round(Number(relative_velocity.kilometers_per_hour))} км/секунду`;

    const distanceIdentifier = distanceType === 'km' ? ' км' : ' лунные орбиты';
    const distance = Math.round(Number(distanceType === 'km' ? distanceKm : distanceLunar)) + distanceIdentifier;

    return (
        <section data-testid={'listitem'} className={cls.AsteroidApproachDetails}>
            <h2 className={cls.header}>{date}</h2>
            <div className={cls.asteroidData}>
                <div className={cls.distance}>
                    Ближайшее расстояние до земли
                    <Image className={cls.distanceArrow} src={'/Arrow.svg'} width={130} height={5} alt={'стрелка'}/>
                    <div data-testid={'distance-type'} className={cls.distanceText}>
                        {distance}
                    </div>
                </div>
                <div>
                    Скорость относительно земли: {speed}
                </div>
                <div>
                    Планета по орбите которой летит астероид: {planetTranslator(orbiting_body)}
                </div>
            </div>
        </section>
    );
};

export const AsteroidApproachDetails = memo(AsteroidApproach);
