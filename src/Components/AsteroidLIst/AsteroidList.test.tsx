import '@testing-library/jest-dom/';
import {fireEvent, render, screen} from '@testing-library/react';
import {AsteroidList} from './AsteroidList';

const mockAsteroids: NearEarthObject[] = [
    {
        'links': {
            'self': 'http://api.nasa.gov/neo/rest/v1/neo/3328631?api_key=evawrynIzVjqGUtswWpC7iA7h7FrDfehcsy3ypCT'
        },
        'id': '3328631',
        'neo_reference_id': '3328631',
        'name': '(2006 FJ)',
        'nasa_jpl_url': 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3328631',
        'absolute_magnitude_h': 20.42,
        'estimated_diameter': {
            'kilometers': {
                'estimated_diameter_min': 0.219055911,
                'estimated_diameter_max': 0.4898239078
            },
            'meters': {
                'estimated_diameter_min': 219.0559109705,
                'estimated_diameter_max': 489.8239078031
            },
            'miles': {
                'estimated_diameter_min': 0.1361149905,
                'estimated_diameter_max': 0.3043623714
            },
            'feet': {
                'estimated_diameter_min': 718.6873949483,
                'estimated_diameter_max': 1607.0338696767
            }
        },
        'is_potentially_hazardous_asteroid': false,
        'close_approach_data': [
            {
                'close_approach_date': '2023-08-29',
                'close_approach_date_full': '2023-Aug-29 22:25',
                'epoch_date_close_approach': 1693347900000,
                'relative_velocity': {
                    'kilometers_per_second': '24.2855769743',
                    'kilometers_per_hour': '87428.0771074451',
                    'miles_per_hour': '54324.40713379'
                },
                'miss_distance': {
                    'astronomical': '0.4388558879',
                    'lunar': '170.7149403931',
                    'kilometers': '65651906.066798773',
                    'miles': '40794202.7775901474'
                },
                'orbiting_body': 'Earth'
            }
        ],
        'is_sentry_object': false
    },
    {
        'links': {
            'self': 'http://api.nasa.gov/neo/rest/v1/neo/3385824?api_key=evawrynIzVjqGUtswWpC7iA7h7FrDfehcsy3ypCT'
        },
        'id': '3385824',
        'neo_reference_id': '3385824',
        'name': '(2007 SR1)',
        'nasa_jpl_url': 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3385824',
        'absolute_magnitude_h': 20.23,
        'estimated_diameter': {
            'kilometers': {
                'estimated_diameter_min': 0.2390864572,
                'estimated_diameter_max': 0.5346135707
            },
            'meters': {
                'estimated_diameter_min': 239.0864571707,
                'estimated_diameter_max': 534.6135707332
            },
            'miles': {
                'estimated_diameter_min': 0.148561391,
                'estimated_diameter_max': 0.3321933691
            },
            'feet': {
                'estimated_diameter_min': 784.4044121439,
                'estimated_diameter_max': 1753.9815874044
            }
        },
        'is_potentially_hazardous_asteroid': false,
        'close_approach_data': [
            {
                'close_approach_date': '2023-08-29',
                'close_approach_date_full': '2023-Aug-29 00:08',
                'epoch_date_close_approach': 1693267680000,
                'relative_velocity': {
                    'kilometers_per_second': '13.5438836275',
                    'kilometers_per_hour': '48757.98105896',
                    'miles_per_hour': '30296.3132863299'
                },
                'miss_distance': {
                    'astronomical': '0.4722657584',
                    'lunar': '183.7113800176',
                    'kilometers': '70649951.530574608',
                    'miles': '43899844.2182732704'
                },
                'orbiting_body': 'Earth'
            }
        ],
        'is_sentry_object': false
    }
];

describe('AsteroidList', () => {
    test('должен отображать заголовок "Ближайшие подлеты астероидов"', () => {
        render(<AsteroidList asteroids={mockAsteroids} onSelect={() => {
        }} distanceType={'km'}/>);
        //@ts-ignore
        const headerElement = screen.getByText(/Ближайшие подлеты астероидов/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('должен отображать кнопки для выбора типа расстояния', () => {
        render(<AsteroidList
            distanceType={'km'} asteroids={mockAsteroids} onSelect={() => {
        }}/>);
        const kmButton = screen.getByRole('button', {name: /в километрах/i});
        const lunarButton = screen.getByRole('button', {name: /в лунных орбитах/i});
        expect(kmButton).toBeInTheDocument();
        expect(lunarButton).toBeInTheDocument();
    });

    test('должен при клике на кнопку "в киллометрах" переводить расстояние в километры', async () => {
        render(
            <AsteroidList distanceType={'km'}asteroids={mockAsteroids} onSelect={() => {
            }}/>
        );
        //@ts-ignore
        const kmButton = screen.getByTestId('buttonkm');
        fireEvent.click(kmButton);
        //@ts-ignore
        const card = screen.getAllByTestId('distance-type')
        expect(card[0]).toHaveTextContent(/км/gi);
    });

    test('должен отображать список астероидов', () => {
        render(<AsteroidList
            distanceType={'km'} asteroids={mockAsteroids} onSelect={() => {
        }}/>);
        //@ts-ignore
        const asteroidCards = screen.getAllByTestId('listitem');
        expect(asteroidCards).toHaveLength(mockAsteroids.length);
    });
});
