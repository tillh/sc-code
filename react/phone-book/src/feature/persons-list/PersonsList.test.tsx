import { render, screen } from '@testing-library/react';
import { listOfPersons } from '../../test-utils/mock-data';
import { PersonsList } from './PersonsList';

describe('PersonsList', () => {
    test('should render a list of persons', () => {
        render(<PersonsList persons={listOfPersons}/>);

        expect(screen.getAllByRole('listitem').length).toBe(30);
    });

    test('should render first and last name of a person', () => {
        render(<PersonsList persons={listOfPersons}/>);
        const firstEntry = screen.getAllByRole('listitem')[0];

        expect(firstEntry).toHaveTextContent('Firstname 0 Lastname 0');
    });
});
