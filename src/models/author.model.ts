import { Book } from "./book.model";

//src/models/author.model.ts
export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    books: Book[];
}