import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) { }

  createUser(user: User) {
    return this.afs.collection<User>('Users').doc(user.id).set(user);
  }
  get_all_users() {
    return this.afs.collection<User>('Users').valueChanges();
  }
  getbyId(id: string) {
    return this.afs.collection<User>('Users').doc(id).valueChanges();
  }
  update(user: User){
    return this.afs.collection<User>('Users').doc(user.id).set(user);
  }
  delete(id: string){
    return this.afs.collection<User>('Users').doc(id).delete();
  }
}
