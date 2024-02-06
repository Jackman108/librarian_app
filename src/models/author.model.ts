//src/models/author.model.ts
import { Book } from "./book.model";
export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    books: Book[];
}