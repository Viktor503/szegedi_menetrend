import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { News } from '../models/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private afs:AngularFirestore) { }
  getNews(): Observable<News[]>{
    return this.afs.collection<News>('news', ref=> ref.orderBy('Datum','desc')).valueChanges();
  }
}
