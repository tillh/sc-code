import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { listOfPersons } from '../../test-utils/mock-data';
import { PersonsList } from './PersonsList';

describe('PersonsList', () => {
    test('should render a list of persons', () => {
        render(<PersonsList
            persons={listOfPersons}
            onSelectPerson={jest.fn()}
            selectedPerson={null}
        />);

        expect(screen.getAllByRole('listitem').length).toBe(30);
    });

    test('should render first and last name of a person', () => {
        render(<PersonsList
            persons={listOfPersons}
            onSelectPerson={jest.fn()}
            selectedPerson={null}
        />);
        const firstEntry = screen.getAllByRole('listitem')[0];

        expect(firstEntry).toHaveTextContent('Firstname 0 Lastname 0');
    });

    test('should call onSelectPerson on click on a person', () => {
        const onSelectPersonSpy = jest.fn();
        render(<PersonsList
            persons={listOfPersons}
            onSelectPerson={onSelectPersonSpy}
            selectedPerson={null}
        />);

        const firstEntry = screen.getAllByRole('listitem')[0];
        userEvent.click(firstEntry);

        expect(onSelectPersonSpy).toHaveBeenCalledTimes(1);
        expect(onSelectPersonSpy).toHaveBeenCalledWith(listOfPersons[0]);
    });
});
