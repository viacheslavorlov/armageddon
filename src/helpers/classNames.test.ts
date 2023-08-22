import { classNames } from './classNames';

describe('classNames', () => {
    test('должен объединять строки с пробелами', () => {
        const result = classNames('foo', 'bar', 'baz');
        expect(result).toBe('foo bar baz');
    });

    test('должен игнорировать undefined значения', () => {
        const result = classNames('foo', undefined, 'bar', undefined, 'baz');
        expect(result).toBe('foo bar baz');
    });

    test('должен возвращать пустую строку, если все значения undefined', () => {
        const result = classNames(undefined, undefined, undefined);
        expect(result).toBe('');
    });
    test('должен работать с одним аргументом', () => {
        const result = classNames('foo');
        expect(result).toBe('foo');
    });

    test('должен возвращать пустую строку без аргументов', () => {
        const result = classNames();
        expect(result).toBe('');
    });
});
