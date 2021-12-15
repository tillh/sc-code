import { produce } from 'immer';
import { Person } from '../../model/person.model';

type PhoneBookState = {
    entries: Array<Person>;
}

type AddPersonAction = {
    type: 'ADD',
    payload: Person;
}

type UpdatePersonAction = {
    type: 'UPDATE',
    payload: Person;
}

type DeletePersonAction = {
    type: 'DELETE',
    payload: string;
}

type Actions = |
    AddPersonAction |
    UpdatePersonAction |
    DeletePersonAction;

const sortPersonsByLastname = (a: Person, b: Person) => (a.lastName ?? '').localeCompare((b.lastName ?? ''));

export const phoneBookReducer = (state: PhoneBookState, action: Actions) => {
    switch (action.type) {
        case 'ADD':
            return produce(state, (draft) => {
                draft.entries.push(action.payload);
                draft.entries.sort(sortPersonsByLastname);
            });
        case 'UPDATE':
            return produce(state, (draft) => {
                const personIndex = draft.entries.findIndex(person => person.id === action.payload.id);
                draft.entries[personIndex] = action.payload;
                draft.entries.sort(sortPersonsByLastname);
            });
        case 'DELETE':
            return produce(state, (draft) => {
                draft.entries = draft.entries.filter(entry => entry.id !== action.payload);
            });
        default:
            return state;
    }
};
