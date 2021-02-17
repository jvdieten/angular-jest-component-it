import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { createHostFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { AuthorFormComponent } from './author-form.component';
import { Author } from '../models/author';
import { Gender } from '../models/gender';

const mockAuthor = {
  name: 'John Doe',
  gender: Gender.MALE,
  numberOfPublications: 5,
  bio: 'I am passionate about writing fiction articles',
  dateOfBirth: new Date('1980-04-11'),
  joinedDate: '2019-10-16'
} as Author;

const mockDatePipe = {
  transform: (value: any) => new Date('1980-04-11')
};

describe('AuthorFormComponent', () => {
  let spectator: Spectator<AuthorFormComponent>;
  const createComponent = createHostFactory({
    component: AuthorFormComponent,
    imports: [FormsModule],
    providers: [
      mockProvider(DatePipe, mockDatePipe)
    ]
  });

  let loader: HarnessLoader;

  const datePipeSpy = jest.spyOn(mockDatePipe, 'transform');

  beforeEach(() => {
    spectator = createComponent('<app-author-form></app-author-form>');
    loader = TestbedHarnessEnvironment.loader(spectator.fixture);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the article form', () => {
    expect(spectator.query('form').getAttribute('name')).toEqual('authorForm');
  });

  // 30 MINUTES TIME DOESN'T MATTER IF YOU DON'T FINISH THE SKELETON IS ALSO FINE.
  // WRITE THE MISSING TESTS USE SPECTATOR WITH THE TESTING GUIDELINES IN YOUR MIND
  // ALL THE SETUP IS DONE FOR YOU
  // BONUS IS TO MAKE USE OF THE AUTHOR-FORM HARNESS SEE README SECTION 4
});
