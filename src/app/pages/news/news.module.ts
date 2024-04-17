import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MatCardModule
  ]
})
export class NewsModule { }
