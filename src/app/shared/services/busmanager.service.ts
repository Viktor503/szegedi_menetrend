/// Az közlekedési adatok a http://szegedimenetrend.hu/ oldalról származnak
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionChanges, doc, getDoc } from '@angular/fire/firestore';
import { Route } from '../models/Route';
import { Trip } from '../models/Trip';
import { Observable, Observer, map } from 'rxjs';
import { Stop_time } from '../models/Stop_time';
import { User } from '../models/User';
import { FieldValue } from 'firebase/firestore';
import { first } from 'rxjs/operators';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class BusmanagerService {

  constructor(private afs: AngularFirestore, private userservice:UserService) { }

  getVehicles(): Observable<Route[]>{
    return this.afs.collection<Route>('routes', ref=> ref.orderBy('route_short_name')).valueChanges();
  }

  getRoutebyId(route_id: number): Observable<Route[]>{
    return this.afs.collection<Route>('routes', ref=> ref.where('route_id', '==', route_id)).valueChanges();
  }

  getTripsbyRouteId(route_id: number): Observable<Trip[]>{
    return this.afs.collection<Trip>('trips', ref=> ref.where('route_id', '==', route_id)).valueChanges();
  }

  getStopsIdbyTripId(trip: string): Observable<Stop_time[]>{
    return this.afs.collection<Stop_time>('stop_times', ref=> ref.where('trip_id', '==', trip).orderBy('stop_sequence')).valueChanges();
  }
  getStopsbyIds(stop_id: string[]): Observable<any>{
    return this.afs.collection('stops', ref=> ref.where('stop_id', 'in', stop_id)).valueChanges();
  }
  getStopbyId(stop_id: number): Observable<any>{
    return this.afs.collection('stops', ref=> ref.where('stop_id', '==', stop_id)).valueChanges();
  }
  getTimetable(trip_id:string,stop_id:number): Observable<any>{
    return this.afs.collection('stop_times', ref=> ref.where('trip_id', '>=', trip_id).where('trip_id', '<=', trip_id+'z').where('stop_id','==',stop_id)).valueChanges();
  }
  getFirebaseIdforRoute(route_id:number){
    return this.afs.collection<Route>('routes', ref=> ref.where('route_id', '==', route_id)).get();
  }

  modifyLikedVehicles(useruid:string,route_id:number,liked:boolean){
    this.getRoutebyId(route_id).pipe(first()).subscribe((route:Route[]) => {
      this.userservice.getById2(useruid).pipe(first()).subscribe((doc) => {
        
        const rname = route[0].route_short_name
        var likes = doc[0].likes;

        if(liked && !(likes?.includes(rname))){
          likes?.push(rname);
        }else{
          likes?.splice(likes.indexOf(rname),1);
        }
        
        this.afs.collection('Users').doc(useruid).update({
          "likes": likes
        });
      });
    });
  };


  modifydislikedVehicles(useruid:string,route_id:number,disliked:boolean){
    this.getRoutebyId(route_id).pipe(first()).subscribe((route:Route[]) => {
      this.userservice.getById2(useruid).pipe(first()).subscribe((doc) => {
        
        const rname = route[0].route_short_name
        var dislikes = doc[0].dislikes;


        if(disliked && !(dislikes?.includes(rname))){
          dislikes?.push(rname);
        }else{
          dislikes?.splice(dislikes.indexOf(rname),1);
        }

        this.afs.collection('Users').doc(useruid).update({
          "dislikes": dislikes
        });
      });
    });
  };


  ChangeRating(route_id:number,newlikes:number,newdislikes:number){
    this.getFirebaseIdforRoute(route_id).subscribe((item) => {
      const id = item.docs[0].id;
      this.afs.collection('routes').doc(id).update({
        " likes": newlikes,
        " dislikes": newdislikes
      });
    });
    
  }
}
