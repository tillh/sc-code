import React, { useState } from 'react';
import { PersonDetail } from './feature/person-detail/PersonDetail';
import { PersonForm } from './feature/person-form/PersonForm';
import { PersonsList } from './feature/persons-list/PersonsList';
import { Person } from './model/person.model';
import { listOfPersons } from './test-utils/mock-data';

type ViewMode = 'ADD' | 'VIEW';

function App() {
    const [viewMode, setViewMode] = useState<ViewMode>('VIEW');
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    const showAddPersonView = () => {
        setSelectedPerson(null);
        setViewMode('ADD');
    };
    const showDefaultView = () => setViewMode('VIEW');
    const showPersonDetails = (person: Person) => {
        setViewMode('VIEW');
        setSelectedPerson(person);
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
                        persons={listOfPersons}
                        onSelectPerson={showPersonDetails}
                        selectedPerson={selectedPerson}
                    />
                </div>
            </section>

            <section
                className={'w-8/12 p-4'}
                data-testid={'person-detail-container'}>
                {viewMode === 'VIEW' ? <PersonDetail person={selectedPerson}/> : null}
                {viewMode === 'ADD' ?
                    <PersonForm onSubmit={(data) => console.log(data)} onCancel={showDefaultView}/> : null}
            </section>
        </main>
    );
}

export default App;
