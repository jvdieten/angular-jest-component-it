import { Author } from './author';

export interface Article {
    id?: string;
    title: string;
    subjectMatter: string;
    body: string;
    author: Author;
    createdDate?: Date;
    updatedDate?: Date;
}
