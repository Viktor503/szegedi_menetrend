import { Component } from '@angular/core';
import { News } from '../../shared/constants/News';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news = News;
  constructor(){

  }
}
