import { v4 } from 'uuid';
import { Person } from '../model/person.model';

export const listOfPersons: Array<Person> = Array(30)
    .fill(null)
    .map((_, index) => ({
        id: v4(),
        firstName: `Firstname ${index}`,
        lastName: `Lastname ${index}`
    }));
