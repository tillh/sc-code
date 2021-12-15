import classNames from 'classnames';
import { Person } from '../../model/person.model';

type PersonsListProps = {
    persons: Array<Person>;
    selectedPerson: Person | null;
    onSelectPerson(person: Person): void;
}

const className = (selected: boolean) => classNames('p-2 hover:bg-slate-200 cursor-pointer', { 'bg-slate-200': selected });

export function PersonsList(props: PersonsListProps) {
    const { persons, selectedPerson, onSelectPerson } = props;


    return (
        <ul>
            {persons.map((person) =>
                <li key={person.id}
                    className={className(selectedPerson?.id === person.id)}
                    onClick={() => onSelectPerson(person)}>
                    {person.firstName} {person.lastName}
                </li>
            )}
        </ul>
    );
}
