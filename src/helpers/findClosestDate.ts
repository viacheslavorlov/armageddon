import {CloseApproachDaum} from '../Model/APIRespoyseSigleAsteroid';

export function findClosestDate(dates: CloseApproachDaum[]): string | null {
    if (dates.length === 0) {
        return null;
    }

    const currentDate = new Date().getTime();
    let closestDate = dates[0].epoch_date_close_approach;

    for (let i = 1; i < dates.length; i++) {
        const date = dates[i].epoch_date_close_approach;
        if (date >= currentDate) {
            closestDate = date;
            break;
        }
    }

    return new Date(closestDate)
        .toLocaleDateString('ru-RU', {year: 'numeric', month: 'long', day: 'numeric'});
}
