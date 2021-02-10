import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private articlesUrl = 'api/articles';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.articlesUrl}/${id}`);
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl);
  }

  addArticle(article: Article): Observable<Article> {
    article.createdDate = new Date();
    return this.http.post<Article>(this.articlesUrl, article, this.httpOptions);
  }

  updateArticle(article: Article): Observable<Article> {
    article.updatedDate = new Date();
    return this.http.put<Article>(this.articlesUrl, article, this.httpOptions);
  }

  deleteArticle(id: string): Observable<Article> {
    return this.http.delete<Article>(`${this.articlesUrl}/${id}`, this.httpOptions);
  }

}
