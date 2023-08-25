import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { AsteroidCard } from './AsteroidCard';

describe('AsteroidCard', () => {
    const asteroid = {
        close_approach_data: [
            {
                miss_distance: {
                    kilometers: '100000',
                    lunar: '10',
                },
            },
        ],
        estimated_diameter: {
            meters: {
                estimated_diameter_max: 200,
            },
        },
        is_potentially_hazardous_asteroid: true,
        id: '123',
        name: 'Asteroid 1',
    };

    test('renders asteroid card correctly', () => {
        render(<AsteroidCard asteroid={asteroid} distanceType="km" isButtonNeeded />);

        expect(screen.getByTestId('listitem')).toBeInTheDocument();
        expect(screen.getByText('Asteroid 1')).toBeInTheDocument();
        expect(screen.getByText('Ø 200 м')).toBeInTheDocument();
        expect(screen.getByText('100000 км')).toBeInTheDocument();
        expect(screen.getByAltText('астероид')).toBeInTheDocument();
        expect(screen.getByAltText('Опасен')).toBeInTheDocument();
        expect(screen.getByText('ЗАКАЗАТЬ')).toBeInTheDocument();
    });

    test('calls onSelectAsteroid when button is clicked', () => {
        const onSelectAsteroid = jest.fn();
        render(
            <AsteroidCard
                asteroid={asteroid}
                distanceType="km"
                onSelectAsteroid={onSelectAsteroid}
                isButtonNeeded
            />
        );

        fireEvent.click(screen.getByText('ЗАКАЗАТЬ'));
        expect(onSelectAsteroid).toHaveBeenCalledWith('123', false);
        expect(screen.getByText('В КОРЗИНЕ')).toBeInTheDocument();
    });
});
