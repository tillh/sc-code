import React, { useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { PersonDetail } from './feature/person-detail/PersonDetail';
import { PersonForm } from './feature/person-form/PersonForm';
import { PersonsList } from './feature/persons-list/PersonsList';
import { initialPhoneBookData } from './feature/phone-book/initialPhoneBookData';
import { phoneBookReducer } from './feature/phone-book/phoneBook.reducer';
import { Person, PersonFormData } from './model/person.model';

type ViewMode = 'ADD_OR_EDIT' | 'VIEW';

function App() {
    const [viewMode, setViewMode] = useState<ViewMode>('VIEW');
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
    const [phoneBook, dispatch] = useReducer(phoneBookReducer, { entries: initialPhoneBookData });

    const showAddPersonView = () => {
        setSelectedPerson(null);
        setViewMode('ADD_OR_EDIT');
    };
    const showDefaultView = () => setViewMode('VIEW');
    const showPersonDetails = (person: Person) => {
        setViewMode('VIEW');
        setSelectedPerson(person);
    };
    const showEditView = () => setViewMode('ADD_OR_EDIT');


    const handleSavePerson = (data: PersonFormData) => {
        if (data.id) {
            dispatch({ type: 'UPDATE', payload: data });
            setSelectedPerson(data);
        } else {
            const newPerson: Person = { ...data, id: v4() };
            dispatch({ type: 'ADD', payload: newPerson });
            setSelectedPerson(newPerson);
        }
        setViewMode('VIEW');
    };

    const handleDelete = (person: Person) => {
        setSelectedPerson(null);
        dispatch({ type: 'DELETE', payload: person.id });
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
                {viewMode === 'VIEW' ?
                    <PersonDetail
                        person={selectedPerson}
                        onDelete={handleDelete}
                        onEdit={showEditView}
                    /> : null}

                {viewMode === 'ADD_OR_EDIT' ?
                    <PersonForm
                        initialData={selectedPerson}
                        onSubmit={handleSavePerson}
                        onCancel={showDefaultView}
                    /> : null}
            </section>
        </main>
    );
}

export default App;
