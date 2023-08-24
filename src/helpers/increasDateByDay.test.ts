import { increaseDateByDay} from './increasDateByDay';

describe('increaseDateByDay', () => {
    test('должна правильно увеличивать дату на 1 день', () => {
        const result = increaseDateByDay('2022-01-01');
        expect(result).toBe('2022-01-02');
    });

    test('должна правильно увеличивать дату на указанное количество дней', () => {
        const result = increaseDateByDay('2022-01-01', 5);
        expect(result).toBe('2022-01-06');
    });

    test('должна правильно увеличивать дату на 1 день без второго аргумента', () => {
        const result = increaseDateByDay('2022-12-31');
        expect(result).toBe('2023-01-01');
    });
});
