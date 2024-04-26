import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timetableconst } from '../../shared/constants/Timetableconst';
import { BusmanagerService } from '../../shared/services/busmanager.service';
import { UserService } from '../../shared/services/user.service';
import { Route } from '../../shared/models/Route';
import { Trip } from '../../shared/models/Trip';
import { Stop_time } from '../../shared/models/Stop_time';
import { Stop } from '../../shared/models/Stop';
import { TimeFormatPipe } from '../../shared/pipes/time-format.pipe';
import { Timestamp } from 'firebase/firestore';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit{
  vehicleid?: number;
  megallo: string = '';
  irany?: number;

  //adatbázis után cserélni
  vehicles:Route[] = [];
  allvalidtrips:Trip[] = [];
  trips:string[] = [];
  tripdirections: number[] = [];
  tripservices: string[] = [];
  megalloidk:number[] = [];
  megallok:Stop[] = [];
  iranyok = {0:'', 1:''};
  curtripid = '';
  timetable:string[] = [];
  routename?:string;

  loggedInUser = localStorage.getItem('user');
  useruid?:string;

  
  formatted = this.toformatted(this.timetable)
  likes=0;
  dislikes=0;
  likestate = 0; //0: none, 1: liked, 2: disliked

  constructor(private actRoute: ActivatedRoute, private busmanager: BusmanagerService,private pipe: TimeFormatPipe, private userservice: UserService){
  }


  ngOnInit() {
    if(this.loggedInUser != 'null'){
      this.useruid = JSON.parse(this.loggedInUser!).uid
    }
    this.busmanager.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  loadIranyok(){
    this.iranyok = {0:'', 1:''};
    this.tripdirections = [];
    this.tripservices = [];
    this.trips = [];
    this.megallo = '';
    this.irany = undefined;
    this.likes = 0;
    this.dislikes = 0;
    this.megalloidk = [];
    this.megallok = [];
    this.curtripid = '';
    this.timetable = [];
    
    this.busmanager.getRoutebyId(+ this.vehicleid!).subscribe((route:Route[]) => {
      this.likes = route[0][' likes'];
      this.dislikes = route[0][' dislikes'];
      this.routename = route[0].route_short_name;
    });

    if(this.loggedInUser != 'null'){
      this.userservice.getById2(this.useruid as string).subscribe((doc) => {
        if(doc[0]['likes'].includes(this.routename!)){
          this.likestate = 1;
        }else if(doc[0]['dislikes'].includes(this.routename!)){
          this.likestate = 2;
        }else{
          this.likestate = 0;
        }
      });
    }else{
      this.likestate = 0;
    }
    

    this.busmanager.getTripsbyRouteId(+ this.vehicleid!).subscribe((trips:Trip[]) => {
      this.allvalidtrips = trips;
      
      //eltároljuk a mostani buszhoz szükséges trip_id-kat
      var Trips = new Set<string>();
      var prevsize = 0;
      trips.forEach((trip:Trip) => {
        Trips.add(trip.trip_id.split('/')[0]+"/0");
        if(Trips.size>prevsize){
          prevsize = Trips.size;
          this.tripdirections.push(trip.direction_id);
          this.tripservices.push(trip.service_id);
        }
      });
      this.trips = Array.from(Trips);
      //szörnyű kód arra, hogy kiválassza az irányokat
      for (let trip of trips){
        if(trip.direction_id == 0){
          this.iranyok[0] = trip.trip_headsign;
        }else if(trip.direction_id == 1){
          this.iranyok[1] = trip.trip_headsign;
        }
        if(this.iranyok[0] != '' && this.iranyok[1] != '') break;
      }      
    });
  }

  loadMegallok(){
    this.megallo = '';
    this.megalloidk = [];
    this.megallok = [];
    this.curtripid = '';
    const vehicleid = +this.vehicleid!;

    var check:string = '';
    for(let i = 0; i < this.trips.length; i++){
      if(this.tripdirections[i] == this.irany && (this.tripservices[i] == 'MN' || this.tripservices[i] == 'T' || this.tripservices[i] == 'IEA')){
        check = this.trips[i];
        break;
      }
    }
    this.curtripid = check;
    
    this.busmanager.getStopsIdbyTripId(check).pipe(first()).subscribe((stops:Stop_time[]) => {
      var Megalloidk: number[] = [];
      stops.forEach((stop:Stop_time) => {
        Megalloidk.push(stop.stop_id);
      });
      this.megalloidk = Array.from(Megalloidk);
      this.megalloidk.forEach(Megalloid => {
        this.busmanager.getStopbyId(Megalloid).subscribe((megallo:Stop[]) => {
          this.megallok.push(megallo[0]);
        });
      });
    });

  }
loadTimetable(){
  this.busmanager.getTimetable(this.curtripid.split('/')[0]+'/', +this.megallo).subscribe((timetable:Stop_time[]) => {
    this.timetable = [];
    timetable.forEach(row => {
      this.timetable.push(this.pipe.transform(row.departure_time as Timestamp));
    });
    this.formatted = this.toformatted(this.timetable);
  });
}

  liked(){
    if(this.loggedInUser == 'null'){
      alert('Be kell jelentkezned / regisztrálnod, hogy értékelni tudj a járműveket!');
      return;
    }
    if(this.likestate == 0){
      this.busmanager.ChangeRating(+this.vehicleid!, this.likes+1,this.dislikes);
      this.busmanager.modifyLikedVehicles(this.useruid as string,+this.vehicleid!,true);
      return;
    }else if(this.likestate == 1){
      this.busmanager.ChangeRating(+this.vehicleid!, this.likes-1, this.dislikes);
      this.busmanager.modifyLikedVehicles(this.useruid as string,+this.vehicleid!,false);
      return;
    }else if(this.likestate == 2){
      this.busmanager.ChangeRating(+this.vehicleid!, this.likes+1, this.dislikes-1);
      this.busmanager.modifyLikedVehicles(this.useruid as string,+this.vehicleid!,true);
      this.busmanager.modifydislikedVehicles(this.useruid as string,+this.vehicleid!,false);
      return;
    }
    
  }
  disliked(){
      if(this.loggedInUser == 'null'){
        alert('Be kell jelentkezned / regisztrálnod, hogy értékelni tudj a járműveket!');
        return;
      }
      if(this.likestate == 0){
        this.busmanager.ChangeRating(+this.vehicleid!, this.likes,this.dislikes+1);
        this.busmanager.modifydislikedVehicles(this.useruid as string,+this.vehicleid!,true);
        return;
      }else if(this.likestate == 1){
        this.busmanager.ChangeRating(+this.vehicleid!, this.likes-1,this.dislikes+1);
        this.busmanager.modifyLikedVehicles(this.useruid as string,+this.vehicleid!,false);
        this.busmanager.modifydislikedVehicles(this.useruid as string,+this.vehicleid!,true);
        return;
      }else if(this.likestate == 2){
        this.busmanager.ChangeRating(+this.vehicleid!, this.likes,this.dislikes-1);
        this.busmanager.modifydislikedVehicles(this.useruid as string,+this.vehicleid!,false);
        return;
      }
    }

  toformatted(times: string[]): Map<string, string[]>{
    const res = new Map<string, string[]>();
    times.forEach(time => {
      const split = time.split(':');
      const values = res.get(split[0]); 
      if (values) {
          values.push(split[1]);
        }
      else{
        res.set(split[0], [split[1]]);
      }
    });
    res.forEach((value, key) => {
      value.sort();
    })
    return new Map([...res.entries()].sort());
  }

}
