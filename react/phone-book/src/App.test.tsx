import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./feature/phone-book/initialPhoneBookData.ts', () => {
    const { listOfPersons } = require('./test-utils/mock-data');
    return {
        initialPhoneBookData: listOfPersons
    };
});

describe('App', () => {
    test('should show person details on click on a list entry', () => {
        render(<App/>);

        userEvent.click(screen.getByText(/firstname 0/i));

        expect(screen.getByTestId('person-detail-container')).toHaveTextContent('Firstname 0 Lastname 0');
    });

    test('should show add person form on click on add person button', () => {
        render(<App/>);

        expect(screen.queryByTestId('person-form')).not.toBeInTheDocument();
        userEvent.click(screen.getByText(/add person/i));
        expect(screen.getByTestId('person-form')).toBeInTheDocument();
    });

    test('should add a person', async () => {
        render(<App/>);
        userEvent.click(screen.getByText(/add person/i));

        userEvent.type(screen.getByRole('textbox', { name: /firstname/i }), 'Max');
        userEvent.type(screen.getByRole('textbox', { name: /lastname/i }), 'Mustermann');
        userEvent.type(screen.getByRole('textbox', { name: /phone number/i }), '123456789');

        userEvent.click(screen.getByLabelText(/save person/i));

        await waitFor(() => expect(screen.getByTestId('person-list-container')).toHaveTextContent('Max Mustermann'));
    });
});
