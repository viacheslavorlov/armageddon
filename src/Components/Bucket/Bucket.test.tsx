import '@testing-library/jest-dom/';
import { render, screen } from '@testing-library/react';
import { Bucket } from './Bucket';

describe('Bucket', () => {
    test('должен отображать количество астероидов в корзине', () => {
        const selectedAsteroids = ['asteroid1', 'asteroid2', 'asteroid3'];

        render(<Bucket selected={selectedAsteroids} distanceType={'km'} />);

        const infoElement = screen.getByText(/3 астероида/i);
        expect(infoElement).toBeInTheDocument();
    });

    test('должен отображать правильное окончание для слова "астероид" - "а"', () => {
        const selectedAsteroids = ['asteroid1', 'asteroid2'];

        render(<Bucket selected={selectedAsteroids} distanceType={'km'} />);

        const infoElement = screen.getByText(/2 астероида/i);
        expect(infoElement).toBeInTheDocument();
    });

    test('должен отображать правильное окончание для слова "астероид"', () => {
        const selectedAsteroids = ['asteroid1'];

        render(<Bucket selected={selectedAsteroids} distanceType={'km'} />);

        const infoElement = screen.getByText(/1 астероид/i);
        expect(infoElement).toBeInTheDocument();
    });

    test('должен отображать правильное окончание для слова "астероид" - "ов"', () => {
        const selectedAsteroids = ['asteroid1', 'asteroid5', 'asteroid2','asteroid3','asteroid4'];

        render(<Bucket selected={selectedAsteroids} distanceType={'km'} />);

        const infoElement = screen.getByText(/5 астероидов/i);
        expect(infoElement).toBeInTheDocument();
    });

    test('должен отображать кнопку "Отправить"', () => {
        const selectedAsteroids = ['asteroid1', 'asteroid2'];

        render(<Bucket selected={selectedAsteroids} distanceType={'km'} />);

        const buttonElement = screen.getByText(/Отправить/i);
        expect(buttonElement).toBeInTheDocument();
    });
});
