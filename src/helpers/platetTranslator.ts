export const planetTranslator = (planet: string): string => {
    // вместо этой функции можно было использовать i18next но так быстрее
    let result: string;
    switch (planet) {
        case 'Earth':
            result = 'Земля';
            break;
        case 'Sun':
            result = 'Солнце';
            break;
        case 'Mercury':
            result = 'Меркурий';
            break;
        case 'Venus':
            result = 'Венера';
            break;
        case 'Mars':
            result = 'Марс';
            break;
        case 'Jupiter':
            result = 'Юпитер';
            break;
        case 'Saturn':
            result = 'Сатурн';
            break;
        case 'Uranus':
            result = 'Уран';
            break;
        case 'Neptune':
            result = 'Нептун';
            break;
        default:
            result = planet; // Если планета не найдена, возвращаем исходное значение
            break;
    }
    return result;
};
