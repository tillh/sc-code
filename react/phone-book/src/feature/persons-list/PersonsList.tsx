import { Person } from '../../model/person.model';

type PersonsListProps = {
    persons: Array<Person>;
}

export function PersonsList(props: PersonsListProps) {
    const { persons } = props;

    return (
        <ul>
            {persons.map((person) =>
                <li key={person.id} className={'p-2 hover:bg-slate-200'}>
                    {person.firstName} {person.lastName}
                </li>
            )}
        </ul>
    );
}
