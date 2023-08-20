import {memo, useState} from 'react';
import {classNames} from '../../helpers/classNames';
import {DistanceType} from '../../Model/DistanceType';
import {AsteroidCard} from '../AsteroidCard/AsteroidCard';
import cls from './AsteroidList.module.css';

interface AsteroidListPrors {
    className?: string;
    asteroids: NearEarthObject[];
}

export const AsteroidListU = (props: AsteroidListPrors) => {
    const {
        className, asteroids
    } = props;

    const [distanceType, setDistanceType] = useState<DistanceType>('km');

    const onChangeDistanceType = (distanceType) => {
        setDistanceType(distanceType);
    };

    return (
        <div className={cls.AsteroidList}>
            <div>
                <h2 className={cls.header}>Ближайшие подлеты астероидов</h2>
                <div className={cls.buttonWrapper}>
                    <button
                        onClick={() => onChangeDistanceType('km')}
                        className={classNames(cls.button, distanceType === 'km' && cls.active)}
                    >
                        в километрах
                    </button>
                    <span className={cls.divider}>|</span>
                    <button
                        onClick={() => onChangeDistanceType('lunar')}
                        className={classNames(cls.button, distanceType === 'lunar' && cls.active)}
                    >
                        в лунных орбитах
                    </button>
                </div>
                {
                    asteroids.map(asteroid => (
                            <AsteroidCard key={asteroid.neo_reference_id} distanceType={distanceType} asteroid={asteroid}/>
                        )
                    )
                }
            </div>
        </div>
    );
};

export const AsteroidList = memo(AsteroidListU);
