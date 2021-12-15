import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PersonForm } from './PersonForm';

describe('PersonForm', () => {
    let onSubmitSpy: jest.Mock;
    let onCancelSpy: jest.Mock;

    beforeEach(() => {
        onSubmitSpy = jest.fn();
        onCancelSpy = jest.fn();
    });

    test('should call onCancel handler on click on cancel button', () => {
        render(<PersonForm onSubmit={onSubmitSpy} onCancel={onCancelSpy}/>);

        userEvent.click(screen.getByLabelText(/cancel/i));

        expect(onCancelSpy).toHaveBeenCalledTimes(1);
    });

    test('should fill all fields and submit form', async () => {
        render(<PersonForm onSubmit={onSubmitSpy} onCancel={onCancelSpy}/>);

        userEvent.type(screen.getByRole('textbox', { name: /firstname/i }), 'Max');
        userEvent.type(screen.getByRole('textbox', { name: /lastname/i }), 'Mustermann');
        userEvent.type(screen.getByRole('textbox', { name: /phone number/i }), '123456789');

        userEvent.click(screen.getByLabelText(/save person/i));

        await waitFor(() => expect(onSubmitSpy).toHaveBeenCalledTimes(1));
        expect(onSubmitSpy).toHaveBeenCalledWith({
            id: '',
            firstName: 'Max',
            lastName: 'Mustermann',
            phoneNumber: '123456789'
        }, expect.anything());
    });
});
