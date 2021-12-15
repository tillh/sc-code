import React from 'react';
import { PersonsList } from './feature/persons-list/PersonsList';
import { listOfPersons } from './test-utils/mock-data';

function App() {
    return (
        <main className={'container mx-auto h-full flex max-w-screen-lg divide-x'}>
            <section className={'w-4/12 overflow-auto p-4'}>
                <PersonsList persons={listOfPersons}/>
            </section>
            <section className={'w-8/12 p-4'}>Detail...</section>
        </main>
    );
}

export default App;
