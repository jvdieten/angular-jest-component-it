import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../models/article';
import { Author } from '../models/author';
import { Gender } from '../models/gender';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.css']
})
export class AuthorFormComponent implements OnInit {
  @Input() article: Article;
  @Output() emittedAuthor = new EventEmitter<Author>();
  @Output() canceled = new EventEmitter<boolean>();

  authorName = '';
  gender: Gender = Gender.MALE;
  numberOfPublications = 0;
  bio = '';
  dateOfBirth: Date;
  joinedDate = new Date().toISOString().split('T')[0];

  private isFormValid: boolean;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (this.article) {
      this.authorName = this.article.author.name;
      this.gender = this.article.author.gender;
      this.numberOfPublications = this.article.author.numberOfPublications;
      this.bio = this.article.author.bio;
      this.dateOfBirth = this.datePipe.transform(this.article.author.dateOfBirth, 'yyyy-MM-dd') as any;
    }
  }

  save(): void {
    this.isFormValid = true;
    document.getElementById('authorForm').querySelectorAll('[required]').forEach((elm: any) => {
      if (!this.isFormValid) { return; }
      if (!elm.value) { this.isFormValid = false; }
    });
    if (this.isFormValid) {
      this.emittedAuthor.emit(
        {
          name: this.authorName,
          gender: this.gender,
          numberOfPublications: this.numberOfPublications,
          bio: this.bio,
          dateOfBirth: this.dateOfBirth,
          joinedDate: this.joinedDate
        });
    }
  }

  previous(): void {
    this.canceled.emit(true);
  }

}
