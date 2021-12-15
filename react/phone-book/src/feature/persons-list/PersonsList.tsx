import { Person } from '../../model/person.model';

type PersonsListProps = {
    persons: Array<Person>;
    onSelectPerson(person: Person): void;
}

export function PersonsList(props: PersonsListProps) {
    const { persons, onSelectPerson } = props;

    return (
        <ul>
            {persons.map((person) =>
                <li key={person.id}
                    className={'p-2 hover:bg-slate-200 cursor-pointer'}
                    onClick={() => onSelectPerson(person)}>
                    {person.firstName} {person.lastName}
                </li>
            )}
        </ul>
    );
}
