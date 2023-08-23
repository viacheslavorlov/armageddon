import {memo} from 'react';
import {classNames} from '../../helpers/classNames';
import {DistanceType} from '../../Model/DistanceType';
import {AsteroidCard} from '../AsteroidCard/AsteroidCard';
import cls from './AsteroidList.module.css';

interface AsteroidListPrors {
    className?: string;
    asteroids: NearEarthObject[];
    onSelect?: (id: string, isItemSelected: boolean) => void;
    distanceType: DistanceType;
    onChangeDistanceType?: (type: DistanceType) => void;
    label: string;
    buttonsNeeded: boolean;
}

export const AsteroidListU = (props: AsteroidListPrors) => {
    const {
        label,
        buttonsNeeded,
        className,
        asteroids,
        onSelect,
        onChangeDistanceType,
        distanceType
    } = props;


    return (
        <div className={classNames(cls.AsteroidList, className)}>
            <div>
                <h2 className={cls.header}>{label}</h2>
                {buttonsNeeded && <div className={cls.buttonWrapper}>
                    <button
                        data-testid={'buttonkm'}
                        onClick={() => onChangeDistanceType && onChangeDistanceType('km')}
                        className={classNames(cls.button, distanceType === 'km' ? cls.active : '')}
                    >
                        в километрах
                    </button>
                    <span className={cls.divider}>|</span>
                    <button
                        onClick={() => onChangeDistanceType && onChangeDistanceType('lunar')}
                        className={classNames(cls.button, distanceType === 'lunar' ? cls.active : '')}
                    >
                        в лунных орбитах
                    </button>
                </div>}
                {
                    asteroids.map((asteroid, i) => (
                            <AsteroidCard
                                isButtonNeeded={buttonsNeeded}
                                key={asteroid.neo_reference_id + i}
                                distanceType={distanceType}
                                asteroid={asteroid}
                                onSelectAsteroid={onSelect ? onSelect : undefined}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export const AsteroidList = memo(AsteroidListU);
