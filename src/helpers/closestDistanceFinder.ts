import {APIResponseSingleAsteroidI} from '../Model/APIRespoyseSigleAsteroid';

export function closestDistanceFinder(asteroids: APIResponseSingleAsteroidI) {
    const currentDate = new Date();

// Фильтрация и сортировка массива данных о сближениях
    const filteredApproaches = asteroids.close_approach_data.filter(approach => {
        const approachDate = new Date(approach.close_approach_date);
        return approachDate >= currentDate;
    });

    filteredApproaches.sort((a, b) => {
        const dateA = new Date(a.close_approach_date);
        const dateB = new Date(b.close_approach_date);
        return dateA.getTime() - dateB.getTime();
    });

// Получение расстояния ближайшего сближения в километрах
    if (filteredApproaches.length > 0) {
        const closestApproach = filteredApproaches[0];
        const missDistance = closestApproach.miss_distance;
        return missDistance.kilometers;
    } else {
        return 'Нет данных';
    }

}
