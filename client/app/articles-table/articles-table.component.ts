import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css']
})
export class ArticlesTableComponent implements OnInit {
  articles = [];

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.dataSvc.getArticles().subscribe((articles) => this.articles = articles);
  }

}
