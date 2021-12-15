import { v4 } from 'uuid';
import { Person } from '../model/person.model';

export const listOfPersons: Array<Person> = Array(30)
    .fill(null)
    .map((_, index) => ({
        id: v4(),
        firstName: `Firstname ${index}`,
        lastName: `Lastname ${index}`,
        phoneNumber: '+49 170 12345678'
    }));

export const aPerson: Person = {
    id: v4(),
    firstName: `Max`,
    lastName: `Mustermann`,
    phoneNumber: '+49 170 12345678'
};
