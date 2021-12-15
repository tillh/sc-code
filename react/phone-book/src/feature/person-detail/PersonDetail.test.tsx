import { render, screen } from '@testing-library/react';
import { aPerson } from '../../test-utils/mock-data';
import { PersonDetail } from './PersonDetail';

describe('PersonDetail', () => {
    test('should render person name', () => {
        render(<PersonDetail person={aPerson}/>);

        expect(screen.getByRole('heading')).toHaveTextContent('Max Mustermann');
    });

    test('should render phone number', () => {
        render(<PersonDetail person={aPerson}/>);

        expect(screen.getByTestId('phone-number')).toHaveTextContent('+49 170 12345678');
    });

    test('should render no person selected when person is not defined', () => {
        render(<PersonDetail person={null}/>);

        expect(screen.getByRole('heading')).toHaveTextContent('No person selected');
    });
});
