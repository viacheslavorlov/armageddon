import {memo, useState} from 'react';
import {classNames} from '../../helpers/classNames';
import {DistanceType} from '../../Model/DistanceType';
import {AsteroidCard} from '../AsteroidCard/AsteroidCard';
import cls from './AsteroidList.module.css';

interface AsteroidListPrors {
    className?: string;
    asteroids: NearEarthObject[];
    onSelect: (id: string, isItemSelected: boolean) => void;
}

export const AsteroidListU = (props: AsteroidListPrors) => {
    const {
        className, asteroids, onSelect
    } = props;

    const [distanceType, setDistanceType] = useState<DistanceType>('km');

    const onChangeDistanceType = (distanceType) => {
        setDistanceType(distanceType);
    };

    return (
        <div className={classNames(cls.AsteroidList, className)}>
            <div>
                <h2 className={cls.header}>Ближайшие подлеты астероидов</h2>
                <div className={cls.buttonWrapper}>
                    <button
                        data-testid={'buttonkm'}
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
                    asteroids.map((asteroid, i) => (
                            <AsteroidCard
                                key={asteroid.neo_reference_id + i}
                                distanceType={distanceType}
                                asteroid={asteroid}
                                onSelectAsteroid={onSelect}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export const AsteroidList = memo(AsteroidListU);
