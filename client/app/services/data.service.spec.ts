import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { DataService } from './data.service';

describe('DataService', () => {
  let spectator: SpectatorHttp<DataService>;
  const createHttp = createHttpFactory(DataService);

  beforeEach(() => spectator = createHttp());

  it('getArticles: should call HttpClient.get with the correct URL', () => {
    spectator.service.getArticles().subscribe();
    spectator.expectOne('api/articles', HttpMethod.GET);
  });

  it('getArticle: should call HttpClient.get with the correct URL', () => {
    spectator.service.getArticle('some-id').subscribe();

    spectator.expectOne('api/articles/some-id', HttpMethod.GET);
  });

  it('addArticle: should call HttpClient.post with the correct URL and request body', () => {
    const article: any = { id: 'some-id' };
    spectator.service.addArticle(article).subscribe();

    const req = spectator.expectOne('api/articles', HttpMethod.POST);
    expect(req.request.body).toEqual(article);
  });

  it('updateArticle: should call HttpClient.put with the correct URL and request body', () => {
    const article: any = { id: 'some-id' };
    spectator.service.updateArticle(article).subscribe();

    const req = spectator.expectOne('api/articles', HttpMethod.PUT);
    expect(req.request.body).toEqual(article);
  });

  it('deleteArticle: should call HttpClient.delete with the correct URL', () => {
    spectator.service.deleteArticle('some-id').subscribe();

    spectator.expectOne('api/articles/some-id', HttpMethod.DELETE);
  });

});
