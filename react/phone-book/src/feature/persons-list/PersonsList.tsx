import { Person } from '../../model/person.model';

type PersonsListProps = {
    persons: Array<Person>;
}

export function PersonsList(props: PersonsListProps) {
    const { persons } = props;

    return (
        <ul>
            {persons.map((person) =>
                <li key={person.id}>
                    {person.firstName} {person.lastName}
                </li>
            )}
        </ul>
    );
}
