import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicles } from '../../shared/constants/Vehicles';
import { Timetableconst } from '../../shared/constants/Timetableconst';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit{
  vehicle: string = '';
  megallo: string = '';
  irany: string = '';
  //adatbázis után cserélni
  vehicles = Vehicles;
  timetable = Timetableconst;
  formatted = this.toformatted(this.timetable)
  likes = 100;
  dislikes = 20;
  likestate = 0; //0: none, 1: liked, 2: disliked

  constructor(private actRoute: ActivatedRoute, private router: Router){
    this.actRoute.params.subscribe((params: any) => {
      this.vehicle = params.vehicle as string;
    });
  }
  ngOnInit() {
    if(this.vehicle == '' || !this.ValidVehicle()){
      this.router.navigateByUrl('/timetable');
    }
  }

  ValidVehicle(){
    if(Vehicles.includes(this.vehicle)){
      return true;
    }else{
      return false;
    }
  }
  liked(){
    if(this.likestate == 0){
      this.likes++;
      this.likestate = 1;
      return;
    }else if(this.likestate == 1){
      this.likes--;
      this.likestate = 0;
      return;
    }else if(this.likestate == 2){
      this.likes++;
      this.dislikes--;
      this.likestate = 1;
      return;
    }
    
  }
  disliked(){
    if(this.likestate == 0){
      this.dislikes++;
      this.likestate = 2;
      return;
    }else if(this.likestate == 1){
      this.likes--;
      this.dislikes++;
      this.likestate = 2;
      return;
    }else if(this.likestate == 2){
      this.dislikes--;
      this.likestate = 0;
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
    return res;
  }

}
