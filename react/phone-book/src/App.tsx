import React, { useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { PersonDetail } from './feature/person-detail/PersonDetail';
import { PersonForm } from './feature/person-form/PersonForm';
import { PersonsList } from './feature/persons-list/PersonsList';
import { initialPhoneBookData } from './feature/phone-book/initialPhoneBookData';
import { Person, PersonFormData } from './model/person.model';
import { phoneBookReducer } from './feature/phone-book/phoneBook.reducer';

type ViewMode = 'ADD' | 'VIEW';

function App() {
    const [viewMode, setViewMode] = useState<ViewMode>('VIEW');
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [phoneBook, dispatch] = useReducer(phoneBookReducer, { entries: initialPhoneBookData });

    const showAddPersonView = () => {
        setSelectedPerson(null);
        setViewMode('ADD');
    };
    const showDefaultView = () => setViewMode('VIEW');
    const showPersonDetails = (person: Person) => {
        setViewMode('VIEW');
        setSelectedPerson(person);
    };

    const handleSavePerson = (data: PersonFormData) => {
        const newPerson: Person = {
            ...data,
            id: v4()
        };
        dispatch({ type: 'ADD', payload: newPerson });
        setViewMode('VIEW');
        setSelectedPerson(newPerson);
    };

    return (
        <main className={'container mx-auto h-full flex max-w-screen-lg divide-x'}>
            <section
                className={'w-4/12 h-full p-4 flex flex-col'}
                data-testid={'person-list-container'}>
                <button
                    className={'btn btn-blue mb-2'}
                    onClick={showAddPersonView}>Add person
                </button>

                <div className={'overflow-auto flex-1'}>
                    <PersonsList
                        persons={phoneBook.entries}
                        onSelectPerson={showPersonDetails}
                        selectedPerson={selectedPerson}
                    />
                </div>
            </section>

            <section
                className={'w-8/12 p-4'}
                data-testid={'person-detail-container'}>
                {viewMode === 'VIEW' ? <PersonDetail person={selectedPerson}/> : null}
                {viewMode === 'ADD' ? <PersonForm onSubmit={handleSavePerson} onCancel={showDefaultView}/> : null}
            </section>
        </main>
    );
}

export default App;
