//src/models/book.model.ts
export interface Book {
    id: string;
    title: string;
    publisher: string;
    authorId: string;
    year: number;
}