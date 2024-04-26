import { Component } from '@angular/core';
import { NewsService } from '../../shared/services/news.service';
import { LoadImageService } from '../../shared/services/load-image.service';
import { first } from 'rxjs/operators';
import { News } from '../../shared/models/News';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  news?:News[];
  loaded = false;
  constructor(private newsservice : NewsService, private loadImageService: LoadImageService){
  }

  ngOnInit(): void {
    this.newsservice.getNews().pipe(first()).subscribe((news) => {
      this.news = news;
      news.forEach((n:News) => {
        if(n.Kep){
          this.loadImageService.loadImage(n.Kep).pipe(first()).subscribe((url) => {
            n.Kep = url;
          });
        }
      },
    );
    }
  );
    
  }
}
