import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticlesTableComponent } from './articles-table/articles-table.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { DatePipe } from '@angular/common';
import { AuthorFormComponent } from './author-form/author-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleViewComponent,
    ArticlesTableComponent,
    ArticleEditComponent,
    AuthorFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    QuillModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
