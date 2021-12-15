import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Person } from '../../model/person.model';

type PersonDetailProps = {
    person: Person | null;
    onEdit(): void;
    onDelete(person: Person): void;
};

export function PersonDetail(props: PersonDetailProps) {
    const { person, onDelete, onEdit } = props;

    if (!person) return <h1>No person selected</h1>;

    return (
        <>
            <div className={'flex justify-end mb-4'}>
                <button data-testid={'edit-person'} className={'mx-4'} onClick={onEdit}>
                    <PencilIcon className="h-6 w-6 text-blue-500"/>
                </button>
                <button data-testid={'delete-person'} onClick={() => onDelete(person)}>
                    <TrashIcon className="h-6 w-6 text-blue-500"/>
                </button>
            </div>

            <h1>{person.firstName} {person.lastName}</h1>
            <span data-testid={'phone-number'}>{person.phoneNumber}</span>
        </>

    );
}
