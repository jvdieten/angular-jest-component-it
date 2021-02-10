import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';
import { DataService } from '../services/data.service';
import { ArticlesTableComponent } from './articles-table.component';

const mockArticles = [
  {
    id: 'some-id',
    title: 'spme-title',
    subjectMatter: 'some-subject-matter',
    author: {
      name: 'some-name'
    }
  }
];

const mockDataService = {
  getArticles: () => of(mockArticles)
};

describe('ArticlesTableComponent', () => {
  let spectator: Spectator<ArticlesTableComponent>;
  const createComponent = createComponentFactory({
    component: ArticlesTableComponent,
    imports: [RouterTestingModule],
    providers: [
      mockProvider(DataService, mockDataService)
    ]
  });

  const dataSvcGetSpy = jest.spyOn(mockDataService, 'getArticles');

  beforeEach(() => spectator = createComponent());
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('ngOnInit', () => {
    it('should call dataSvc.getArticles', () => {
      expect(dataSvcGetSpy).toHaveBeenCalled();
    });
    it('should component.articles be assigned the articles returned from API', () => {
      expect(spectator.component.articles).toEqual(mockArticles);
    });
  });

});
