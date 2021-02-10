import { MockComponent } from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { QuillEditorComponent } from 'ngx-quill';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DatePipe } from '@angular/common';

import { Article } from '../models/article';
import { Author } from '../models/author';
import { Gender } from '../models/gender';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { DataService } from '../services/data.service';
import { ArticleEditComponent } from './article-edit.component';

const mockDataService = {
  addArticle: (article) => of({}),
  updateArticle: (article) => of({})
};

const mockDatePipe = {
  transform: (value: any) => new Date('1980-04-11')
};

// UNIT test example
describe('ArticleEditComponent Tests: As a class', () => {
  let articleEditComponent: ArticleEditComponent;

  beforeEach(() => {
    articleEditComponent = new ArticleEditComponent(null, null);
    articleEditComponent.article = {} as Article;

  });
  describe('when ngOnint', () => {

    it('should return title when the article title is set', () => {
      // ARRANGE
      articleEditComponent.article.title = 'unitTestTitle';
      // ACT
      articleEditComponent.ngOnInit();
      // ASSERT
      expect(articleEditComponent.title).toEqual('unitTestTitle');
    });

    it('should return subjectMatter when the article subjectMatter is set', () => {
      articleEditComponent.article.subjectMatter = 'unitSubjectMatter';
      articleEditComponent.ngOnInit();
      expect(articleEditComponent.subjectMatter).toEqual('unitSubjectMatter');
    });


    it('should return body when the article body is set', () => {
      articleEditComponent.article.body = 'unitTestBody';
      articleEditComponent.ngOnInit();
      expect(articleEditComponent.body).toEqual('unitTestBody');
    });

  });

});

// SHALLOW tests
describe('ArticleEditComponent Tests: As an independent component', () => {

  let spectator: Spectator<ArticleEditComponent>;
  const updateArticleSpy = jest.spyOn(mockDataService, 'updateArticle');

  const createComponent = createComponentFactory({
    component: ArticleEditComponent,
    componentMocks: [Router],
    providers: [
      mockProvider(DataService, mockDataService)
    ],
    shallow: true
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cancel method', () => {
    it('should navigate to the Articles page when attempting to create a new article', () => {
      // ARRANGE
      const routerSpy = spectator.inject(Router, true);
      // ACT
      spectator.component.cancel();
      // ASSERT
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
    });

    it('should emit cancel action when attempting to edit selected article', () => {
      spectator.component.article = {
        id: 'someId'
      } as any;

      const actionEmitSpy = spyOn(spectator.component.action, 'emit');
      spectator.component.cancel();

      expect(actionEmitSpy).toHaveBeenCalledWith('cancel');
    });
  });

  describe('next method', () => {

    it('should showAuthorForm is false when form is invalid', () => {
      const nextBtn = spectator.query('#next');
      nextBtn.dispatchEvent(new Event('click'));

      expect(spectator.component.showAuthorForm).toBe(false);
    });

    it('should showAuthorForm is true when form is valid', () => {
      const titleInput = spectator.query('#title');
      const subjectInput = spectator.query('#subjectMatter');
      spectator.typeInElement('title', titleInput);
      spectator.typeInElement('subject', subjectInput);
      const nextBtn = spectator.query('#next');
      nextBtn.dispatchEvent(new Event('click'));

      expect(spectator.component.showAuthorForm).toBe(true);
    });
  });

  describe('submittedAuthor', () => {

      let routerSpy;
      const author = {
        id: 'someId'
      } as any;
      const article = {
        id: 'someId',
        title: 'Test Spectator',
        subjectMatter: 'unit tests',
        body: 'some content',
        author
      };

      beforeEach(() => {
        spectator.component.article = {
          id: article.id
        } as any;
        routerSpy = spectator.inject(Router, true);

        spectator.component.title = article.title;
        spectator.component.subjectMatter = article.subjectMatter;
        spectator.component.body = article.body;
      });
      it('should call updateArticle with the correct param when updating an exsting article', () => {

      spectator.component.submittedAuthor(author);

      expect(spectator.component.article).toEqual(article);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
      expect(updateArticleSpy).toHaveBeenCalledWith(article);
    });

      it('should navigate to articles after updating an exsting article', () => {

      spectator.component.submittedAuthor(author);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
    });
  });

});

describe('ArticleEditComponent Tests: integration test', () => {
  let spectator: Spectator<ArticleEditComponent>;
  const createComponent = createComponentFactory({
    component: ArticleEditComponent,
    imports: [FormsModule],
    componentMocks: [Router],
    providers: [
      mockProvider(DataService, mockDataService),
      mockProvider(DatePipe, mockDatePipe)
    ],
    declarations: [AuthorFormComponent, MockComponent(QuillEditorComponent)]
  });

  const addArticleSpy = jest.spyOn(mockDataService, 'addArticle');

  beforeEach(() => spectator = createComponent());
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call addArticle with the correct data when creating a new article', async () => {
      const routerSpy = spectator.inject(Router, true);
      const author: Author = {
        name: 'authorName',
        bio: 'bio',
        dateOfBirth: new Date('2000-02-09').toISOString().split('T')[0] as any,
        gender: Gender.MALE,
        numberOfPublications: 0,
        joinedDate: new Date().toISOString().split('T')[0]
      };
      const article: Article = {
        title: 'title',
        subjectMatter: 'subject',
        body: '',
        author
      };

      const titleInput = spectator.query('#title');
      const subjectInput = spectator.query('#subjectMatter');
      const nextBtn = spectator.query('#next');

      spectator.typeInElement(article.title, titleInput);
      spectator.typeInElement(article.subjectMatter, subjectInput);
      spectator.click(nextBtn);

      await spectator.fixture.whenStable();
      const nameInputEl = spectator.query('#authorName');
      const birthDayInputEl = spectator.query('#birthday');
      const bioInputEl = spectator.query('#bio');
      const submitBtn = spectator.query('input[type="submit"]');

      spectator.typeInElement(author.name, nameInputEl);
      spectator.typeInElement(author.dateOfBirth.toString(), birthDayInputEl);
      spectator.typeInElement(author.bio, bioInputEl);

      spectator.click(submitBtn);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
      expect(addArticleSpy).toHaveBeenCalledWith(article);
    });


});
