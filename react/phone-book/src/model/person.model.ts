export type Person = NewPerson & {
    id: string;
}

export type NewPerson = {
    firstName?: string;
    lastName?: string;
    phone?: string;
}
