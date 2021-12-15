import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
    test('should show person details on click on a list entry', () => {
        render(<App/>);

        userEvent.click(screen.getByText(/firstname 0/i));

        expect(screen.getByTestId('person-detail-container')).toHaveTextContent('Firstname 0 Lastname 0');
    });

    test('should add person form on click on add person button', () => {
        render(<App/>);

        expect(screen.queryByTestId('person-form')).not.toBeInTheDocument();
        userEvent.click(screen.getByText(/add person/i));
        expect(screen.getByTestId('person-form')).toBeInTheDocument();
    });
});
