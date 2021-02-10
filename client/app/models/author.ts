import { Gender } from './gender';

export interface Author {
    id?: string;
    name: string;
    gender: Gender;
    numberOfPublications: number;
    bio: string;
    dateOfBirth: Date;
    joinedDate: string;
}
