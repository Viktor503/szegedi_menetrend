import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class LoadImageService {

  constructor(private storage: AngularFireStorage) { }
  loadImage(imageUrl: string) {
    return this.storage.ref('/images/'+imageUrl).getDownloadURL();
  }
}
