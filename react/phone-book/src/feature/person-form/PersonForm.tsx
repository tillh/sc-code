import { useForm } from 'react-hook-form';
import { Person, PersonFormData } from '../../model/person.model';

type PersonFormProps = {
    initialData?: Person | null;
    onSubmit(personData: PersonFormData): void;
    onCancel(): void;
}

const defaultValues: PersonFormData = { id: '', firstName: '', lastName: '', phoneNumber: '' };

export function PersonForm(props: PersonFormProps) {
    const { initialData, onSubmit, onCancel } = props;

    const { register, handleSubmit } = useForm<PersonFormData>({ defaultValues: initialData ?? defaultValues });

    return (
        <form data-testid={'person-form'} onSubmit={handleSubmit(onSubmit)} noValidate>
            <input type="hidden" {...register('id')}/>

            <div className={'mb-4'}>
                <label className={'label'} htmlFor="first-name">
                    Firstname
                </label>
                <input
                    className={'input'}
                    id="first-name" type="text"{...register('firstName')} />
            </div>

            <div className={'mb-4'}>
                <label className={'label'} htmlFor="last-name">
                    Lastname
                </label>
                <input
                    className={'input'}
                    id="last-name" type="text"{...register('lastName')} />
            </div>

            <div className={'mb-4'}>
                <label className={'label'} htmlFor="phone-number">
                    Phone number
                </label>
                <input
                    className={'input'}
                    id="phone-number" type="tel"{...register('phoneNumber')} />
            </div>

            <div className="flex items-center justify-between">
                <button
                    className="btn btn-blue"
                    aria-label={'Save person'}
                    type="submit">
                    Save
                </button>
                <button
                    className="btn btn-red"
                    type="button"
                    aria-label={'Cancel'}
                    onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </form>

    );
}
