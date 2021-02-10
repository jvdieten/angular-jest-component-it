import { Router } from '@angular/router';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { ArticleEditComponent } from '../article-edit/article-edit.component';
import { Article } from '../models/article';
import { Author } from '../models/author';
import { Gender } from '../models/gender';
import { DataService } from '../services/data.service';
import { ArticleViewComponent } from './article-view.component';

const mockAuthor = {
  id: 'some-id',
  name: 'John Doe',
  gender: Gender.MALE,
  numberOfPublications: 5,
  bio: 'I am passionate about writing fiction articles',
  dateOfBirth: new Date('1980-04-11'),
  joinedDate: '2019-10-16'
} as Author;

const mockArticle = {
  id: 'some-id',
  title: 'Test Article',
  subjectMatter: 'Jest with Spectator',
  body: 'some content',
  createdDate: new Date('2009-05-20'),
  author: mockAuthor
} as Article;

const mockDataService = {
  getArticle: (id) => of(mockArticle),
  deleteArticle: (id) => of({})
};

describe('ArticleViewComponent', () => {
  let spectator: SpectatorRouting<ArticleViewComponent>;
  const createComponent = createRoutingFactory({
    component: ArticleViewComponent,
    params: { id: 'test-id' },
    data: {},
    componentMocks: [Router],
    providers: [
      mockProvider(DataService, mockDataService)
    ],
    declarations: [MockComponent(ArticleEditComponent)]
  });

  const dataSvcGetSpy = jest.spyOn(mockDataService, 'getArticle');
  const dataSvcDeleteSpy = jest.spyOn(mockDataService, 'deleteArticle');

  beforeEach(() => spectator = createComponent());
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ngOnInit', () => {
    it('should call dataSvc.getArticle with the correct param', () => {
      expect(dataSvcGetSpy).toHaveBeenCalledWith('test-id');
    });
    it('should component.article be assigned the article returned from API', () => {
      expect(spectator.component.article).toEqual(mockArticle);
    });
  });

  describe('edit', () => {
    it('should set component.editMode to true ', () => {
      spectator.component.edit();

      expect(spectator.component.editMode).toEqual(true);
    });
  });

  describe('delete', () => {
    it('should open confirm window with the correct msg', () => {
      window.confirm = jest.fn().mockImplementation(() => true);

      spectator.component.delete();

      expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this article?');
    });

    it('should call dataSvc.deleteArticle with the correct param when deleting is confirmed', () => {
      window.confirm = jest.fn().mockImplementation(() => true);

      spectator.component.delete();

      expect(dataSvcDeleteSpy).toHaveBeenCalledWith(spectator.component.article.id);
    });

    it('should call router.navigate with the correct param when deleting is confirmed', () => {
      const routerSpy = spectator.inject(Router, true);
      window.confirm = jest.fn().mockImplementation(() => true);

      spectator.component.delete();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/articles']);
    });

    it('should not call dataSvc.deleteArticle when deleting is canceled', () => {
      window.confirm = jest.fn().mockImplementation(() => false);

      spectator.component.delete();

      expect(dataSvcDeleteSpy).not.toHaveBeenCalled();
    });

    it('should not call router.navigate when deleting is canceled', () => {
      const routerSpy = spectator.inject(Router, true);
      window.confirm = jest.fn().mockImplementation(() => false);

      spectator.component.delete();

      expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
  });

  describe('onAction', () => {
    it('should set component.editMode to true', () => {
      spectator.component.editMode = true;

      spectator.component.onAction('cancel');

      expect(spectator.component.editMode).toBe(false);
    });
  });

});
