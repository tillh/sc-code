import React, { useState } from 'react';
import { PersonDetail } from './feature/person-detail/PersonDetail';
import { PersonsList } from './feature/persons-list/PersonsList';
import { Person } from './model/person.model';
import { listOfPersons } from './test-utils/mock-data';

function App() {
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    return (
        <main className={'container mx-auto h-full flex max-w-screen-lg divide-x'}>
            <section
                className={'w-4/12 overflow-auto p-4'}
                data-testid={'person-list-container'}>
                <PersonsList persons={listOfPersons} onSelectPerson={setSelectedPerson}/>
            </section>

            <section
                className={'w-8/12 p-4'}
                data-testid={'person-detail-container'}>
                <PersonDetail person={selectedPerson}/>
            </section>
        </main>
    );
}

export default App;
