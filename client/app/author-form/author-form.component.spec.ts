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
  dateOfBirth: new Date('2000-02-09').toISOString().split('T')[0] as any,
  joinedDate: '2019-10-16'
} as Author;

const mockDatePipe = {
  transform: (value: any) => new Date('1980-04-11')
};

describe('unit test', () => {
  describe('ngOnInit', () => {

    describe('ngOnInit', () => {
      let authorComponent: AuthorFormComponent;

      beforeEach(() => {
        authorComponent = new AuthorFormComponent(mockDatePipe as any);
        authorComponent.article = {
          author: mockAuthor
        } as any;
      });

      it('should assign authorName the correct value', () => {

        authorComponent.ngOnInit();

        expect(authorComponent.authorName).toEqual(mockAuthor.name);
      });

      it('should assign gender the correct value', () => {

        authorComponent.ngOnInit();

        expect(authorComponent.gender).toEqual(mockAuthor.gender);
      });

      it('should assign numberOfPublications the correct value', () => {

        authorComponent.ngOnInit();

        expect(authorComponent.numberOfPublications).toEqual(mockAuthor.numberOfPublications);
      });

      it('should assign bio the correct value', () => {

        authorComponent.ngOnInit();

        expect(authorComponent.bio).toEqual(mockAuthor.bio);
      });
    });
  });
});

describe('template shallow test', () => {
  let spectator: Spectator<AuthorFormComponent>;
  const createComponent = createHostFactory({
    component: AuthorFormComponent,
    imports: [FormsModule],
    providers: [
      mockProvider(DatePipe, mockDatePipe)
    ]
  });

  let loader: HarnessLoader;

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

  describe('on save', () => {
    it('should emit author when form is valid', async () => {
      spectator.detectChanges();
      const authorEmitSpy = jest.spyOn(spectator.component.emittedAuthor, 'emit');
      const authorFormHarness = await loader.getHarness(AuthorFormHarness);

      spectator.component.joinedDate = mockAuthor.joinedDate;
      spectator.component.numberOfPublications = mockAuthor.numberOfPublications;

      await authorFormHarness.setName(mockAuthor.name);
      spectator.fixture.debugElement.nativeElement.querySelector('#birthday').value = '1980-04-11';
      const nameInputEl = spectator.query('#authorName');
      const birthDayInputEl = spectator.query('#birthday');
      const bioInputEl = spectator.query('#bio');
      const submitBtn = spectator.query('input[type="submit"]');

      spectator.typeInElement(mockAuthor.name, nameInputEl);
      spectator.typeInElement(mockAuthor.dateOfBirth.toString(), birthDayInputEl);
      spectator.typeInElement(mockAuthor.bio, bioInputEl);

      spectator.click(submitBtn);

      expect(authorEmitSpy).toHaveBeenCalledWith(mockAuthor);
    });

    it('should not emit author when form is invalid', () => {
      const authorEmitSpy = spyOn(spectator.component.emittedAuthor, 'emit');
      const submitBtn = spectator.query('input[type="submit"]');

      spectator.click(submitBtn);

      expect(authorEmitSpy).not.toHaveBeenCalled();
    });
  });

  describe('previous', () => {
    it('should emit true value', () => {
      const canceledEmitSpy = spyOn(spectator.component.canceled, 'emit');

      const previousBtn = spectator.query('button');

      spectator.click(previousBtn);

      expect(canceledEmitSpy).toHaveBeenCalledWith(true);
    });
  });
});
