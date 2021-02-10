import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showWriteArticleBtn = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event.url === '/articles' || event.url === '/') {
        this.showWriteArticleBtn = true;
      } else {
        if (event.url !== undefined) {
          this.showWriteArticleBtn = false;
        }
      }
    });
  }

}