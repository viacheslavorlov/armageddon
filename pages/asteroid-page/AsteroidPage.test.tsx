import {render, screen} from '@testing-library/react';
import {API_KEY} from '../../src/consts/apiKey';
import {APIResponseSingleAsteroidI} from '../../src/Model/APIRespoyseSigleAsteroid';
import AsteroidPage, {getServerSideProps} from './[id]';


describe('AsteroidPage', () => {

    test('должен вызывать функцию getServerSideProps с правильными параметрами', async () => {
        const mockContext = {
            params: {
                id: '54376677',
            },
        };

        const mockResponse = {
            json: jest.fn().mockResolvedValueOnce({
                'links': {
                    'self': 'http://api.nasa.gov/neo/rest/v1/neo/54376677?api_key=evawrynIzVjqGUtswWpC7iA7h7FrDfehcsy3ypCT'
                },
                'id': '54376677',
                'neo_reference_id': '54376677',
                'name': '(2023 PJ)',
                'designation': '2023 PJ',
                'nasa_jpl_url': 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=54376677',
                'absolute_magnitude_h': 21.887,
                'estimated_diameter': {
                    'kilometers': {
                        'estimated_diameter_min': 0.1114692237,
                        'estimated_diameter_max': 0.2492527616
                    },
                    'meters': {
                        'estimated_diameter_min': 111.4692237013,
                        'estimated_diameter_max': 249.2527615952
                    },
                    'miles': {
                        'estimated_diameter_min': 0.069263743,
                        'estimated_diameter_max': 0.1548784377
                    },
                    'feet': {
                        'estimated_diameter_min': 365.7126878881,
                        'estimated_diameter_max': 817.758430352
                    }
                },
                'is_potentially_hazardous_asteroid': false,
                'close_approach_data': [
                    {
                        'close_approach_date': '1952-01-06',
                        'close_approach_date_full': '1952-Jan-06 16:32',
                        'epoch_date_close_approach': -567588480000,
                        'relative_velocity': {
                            'kilometers_per_second': '10.9575283438',
                            'kilometers_per_hour': '39447.1020376285',
                            'miles_per_hour': '24510.8951522142'
                        },
                        'miss_distance': {
                            'astronomical': '0.1618206403',
                            'lunar': '62.9482290767',
                            'kilometers': '24208023.110916161',
                            'miles': '15042168.0465225818'
                        },
                        'orbiting_body': 'Earth'
                    },
                    {
                        'close_approach_date': '2023-08-25',
                        'close_approach_date_full': '2023-Aug-25 21:11',
                        'epoch_date_close_approach': 1692997860000,
                        'relative_velocity': {
                            'kilometers_per_second': '12.0238356322',
                            'kilometers_per_hour': '43285.8082759787',
                            'miles_per_hour': '26896.1179257046'
                        },
                        'miss_distance': {
                            'astronomical': '0.1610816739',
                            'lunar': '62.6607711471',
                            'kilometers': '24097475.311474593',
                            'miles': '14973476.8292036634'
                        },
                        'orbiting_body': 'Earth'
                    }
                ],
                'orbital_data': {
                    'orbit_id': '2',
                    'orbit_determination_date': '2023-08-11 05:57:39',
                    'first_observation_date': '2023-08-07',
                    'last_observation_date': '2023-08-10',
                    'data_arc_in_days': 3,
                    'observations_used': 37,
                    'orbit_uncertainty': '9',
                    'minimum_orbit_intersection': '.053807',
                    'jupiter_tisserand_invariant': '4.374',
                    'epoch_osculation': '2460164.5',
                    'eccentricity': '.4605396850761602',
                    'semi_major_axis': '1.505819486695061',
                    'inclination': '15.78859335623894',
                    'ascending_node_longitude': '124.6567763343852',
                    'orbital_period': '674.9285451318043',
                    'perihelion_distance': '.8123298545109722',
                    'perihelion_argument': '282.2676856490326',
                    'aphelion_distance': '2.199309118879149',
                    'perihelion_time': '2460242.086800421014',
                    'mean_anomaly': '318.6159922364664',
                    'mean_motion': '.5333897974780381',
                    'equinox': 'J2000',
                    'orbit_class': {
                        'orbit_class_type': 'APO',
                        'orbit_class_description': 'Near-Earth asteroid orbits which cross the Earth’s orbit similar to that of 1862 Apollo',
                        'orbit_class_range': 'a (semi-major axis) > 1.0 AU; q (perihelion) < 1.017 AU'
                    }
                },
                'is_sentry_object': false
            }),
        };

        const mockFetch = jest.fn().mockResolvedValueOnce(mockResponse);
        global.fetch = mockFetch;

        await getServerSideProps(mockContext);

        expect(mockFetch).toHaveBeenCalledWith(
            `https://api.nasa.gov/neo/rest/v1/neo/54376677?api_key=${API_KEY}`
        );
    });
});
