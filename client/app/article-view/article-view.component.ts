import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article';
import { DataService } from '../services/data.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.css']
})
export class ArticleViewComponent implements OnInit {
  editMode = false;
  article: Article;

  constructor(private route: ActivatedRoute, private router: Router, private dataSvc: DataService) { }

  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap(params => this.dataSvc.getArticle(params.id)))
      .subscribe(article => this.article = article);
  }

  edit(): void {
    this.editMode = true;
  }

  delete(): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.dataSvc.deleteArticle(this.article.id).subscribe(article => this.router.navigate(['/articles']));
    }
  }

  onAction(action: string): void{
    this.editMode = false;
  }
}
