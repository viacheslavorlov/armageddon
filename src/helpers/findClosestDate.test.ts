import {CloseApproachDaum} from '../Model/APIRespoyseSigleAsteroid';
import {findClosestDate} from './findClosestDate';

describe('findClosestDate', () => {
    test('должна возвращать null, если массив дат пустой или не определен', () => {
        expect(findClosestDate([])).toBeNull();

        expect(findClosestDate(undefined)).toBeNull();
    });

    test('должна возвращать ближайшую дату в правильном формате', () => {
        const dates: CloseApproachDaum[] = [
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
            },
            {
                'close_approach_date': '2023-08-26',
                'close_approach_date_full': '2023-Aug-26 21:11',
                'epoch_date_close_approach': 1633056000000,
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
        ];

        expect(findClosestDate(dates)).toBe('26 августа 2023 г.');
    });

    test('должна возвращать null, если все даты находятся в прошлом', () => {
        const dates: CloseApproachDaum[] = [
            {
                'close_approach_date': '1952-01-06',
                'close_approach_date_full': '1952-Jan-06 16:32',
                'epoch_date_close_approach': 1633056000000,
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
                'close_approach_date': '1952-01-06',
                'close_approach_date_full': '1952-Jan-06 16:32',
                'epoch_date_close_approach': 1627776000000,
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
        ];

        expect(findClosestDate(dates)).toBeNull();
    });
});
