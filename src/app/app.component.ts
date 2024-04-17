import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  page = 'main';
  constructor(private router: Router) {
  }

  title = 'menetrend';
  ChangePage(selectedPage: string) {
    this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

}

