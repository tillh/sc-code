import { Person } from '../../model/person.model';

type PersonDetailProps = {
    person: Person | null;
};

export function PersonDetail(props: PersonDetailProps) {
    const { person } = props;

    if (!person) return <h1>No person selected</h1>;

    return (
        <>
            <h1>{person.firstName} {person.lastName}</h1>
            <span data-testid={'phone-number'}>{person.phoneNumber}</span>
        </>

    );
}
