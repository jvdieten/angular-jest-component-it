import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Article } from './models/article';
import { Gender } from './models/gender';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const articles = [
      {
        id: 'dd00f635-9e40-4416-a134-2fbd2def1dde',
        title: 'The Great Gatsby',
        subjectMatter: 'English literature',
        body: `<p>
        This article is about the great gatsby.
        </p>`,
        author: {
          id: '1',
          name: 'F. Scott Fitzgerald',
          gender: Gender.MALE,
          bio: '',
          numberOfPublications: 10,
          dateOfBirth: new Date('1980-04-11'),
          joinedDate: '2019-01-09'
        },
        createdDate: new Date('1995-09-17'),
        updatedDate: new Date('2007-10-12')
      },
      {
        id: '1a584205-5cda-443c-bd3f-6cc5e755ec2b',
        title: 'The Civil War',
        subjectMatter: 'American History',
        body: `<p>
        This article is about the civil wars.
        </p>`,
        author: {
          id: '2',
          name: 'James Smith',
          gender: Gender.MALE,
          bio: '',
          numberOfPublications: 10,
          dateOfBirth: new Date('1980-04-11'),
          joinedDate: '2019-01-09'
        },
        createdDate: new Date('1999-02-04'),
        updatedDate: new Date('2005-11-03')
      },
      {
        id: '5f0fbe94-e555-4747-bb7a-e8e99bf6c404',
        title: 'The Dreamer',
        subjectMatter: 'Fiction',
        body: `<p>
        This article is about the dreamer - fiction
        </p>`,
        author: {
          id: '3',
          name: 'Maria Garcia',
          gender: Gender.FEMALE,
          bio: '',
          numberOfPublications: 22,
          dateOfBirth: new Date('1980-04-11'),
          joinedDate: '2019-01-09'
        },
        createdDate: new Date('2003-05-01'),
        updatedDate: new Date('2004-10-20')
      },
      {
        id: '63d7532d-9cd5-4238-be17-667d52098d77',
        title: 'The Comedian',
        subjectMatter: 'Comedy',
        body: `<p>Hi - I am a comedian and I am proud of it.</p>`,
        author: {
          id: '4',
          name: 'Olivia Moore',
          gender: Gender.FEMALE,
          bio: '',
          numberOfPublications: 10,
          dateOfBirth: new Date('1980-04-11'),
          joinedDate: '2019-01-09'
        },
        createdDate: new Date('2010-11-06'),
        updatedDate: new Date('2009-03-06')
      },
      {
        id: '92de0a91-a8e3-48f0-9740-e18e9bfae48e',
        title: 'Bike Ride',
        subjectMatter: 'Mountain Biking',
        body: '<p>Go mountain biking in the summer.</p>',
        author: {
          id: '5',
          name: 'Jacob Adams',
          gender: Gender.MALE,
          bio: '',
          numberOfPublications: 10,
          dateOfBirth: new Date('1980-04-11'),
          joinedDate: '2019-01-09'
        },
        createdDate: new Date('2019-12-02'),
        updatedDate: new Date('2020-01-03')
      }
    ] as Article[];

    return {articles};
  }

  genId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
