import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesTableComponent } from './articles-table/articles-table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
  { path: 'articles', component: ArticlesTableComponent},
  { path: 'article/view/:id', component: ArticleViewComponent },
  { path: 'article/new', component: ArticleEditComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/articles' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
