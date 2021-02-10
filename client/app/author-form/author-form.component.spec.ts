import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { createHostFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { AuthorFormComponent } from './author-form.component';
import { Author } from '../models/author';
import { Gender } from '../models/gender';
import { AuthorFormHarness } from './author-form.harness';

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

  describe('ngOnInit', () => {
    it('should assign title, subjectMatter, and body the correct values', () => {
      spectator.component.article = {
        author: mockAuthor
      } as any;

      spectator.component.ngOnInit();

      expect(spectator.component.authorName).toEqual(mockAuthor.name);
      expect(spectator.component.gender).toEqual(mockAuthor.gender);
      expect(spectator.component.numberOfPublications).toEqual(mockAuthor.numberOfPublications);
      expect(spectator.component.bio).toEqual(mockAuthor.bio);
      expect(spectator.component.dateOfBirth).toEqual(mockAuthor.dateOfBirth);
    });
  });

  describe('save', () => {
    it('should emit author when form is valid', async () => {
      spectator.detectChanges();
      const authorEmitSpy = jest.spyOn(spectator.component.emittedAuthor, 'emit');
      const authorFormHarness = await loader.getHarness(AuthorFormHarness);

      spectator.component.bio = mockAuthor.bio;
      spectator.component.dateOfBirth = mockAuthor.dateOfBirth;
      spectator.component.joinedDate = mockAuthor.joinedDate;
      spectator.component.numberOfPublications = mockAuthor.numberOfPublications;

      await authorFormHarness.setName(mockAuthor.name);
      spectator.fixture.debugElement.nativeElement.querySelector('#birthday').value = '1980-04-11';

      spectator.component.save();

      expect(authorEmitSpy).toHaveBeenCalledWith(mockAuthor);
    });

    it('should not emit author when form is invalid', () => {
      const authorEmitSpy = spyOn(spectator.component.emittedAuthor, 'emit');

      spectator.fixture.debugElement.nativeElement.querySelector('#authorName').value = '';
      spectator.fixture.debugElement.nativeElement.querySelector('#birthday').value = '';

      spectator.component.save();

      expect(authorEmitSpy).not.toHaveBeenCalled();
    });
  });

  describe('previous', () => {
    it('should emit true value', () => {
      const canceledEmitSpy = spyOn(spectator.component.canceled, 'emit');

      spectator.component.previous();

      expect(canceledEmitSpy).toHaveBeenCalledWith(true);
    });
  });
});
