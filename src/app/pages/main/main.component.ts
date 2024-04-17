import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicles } from '../../shared/constants/Vehicles';
import { VehicleRatings } from '../../shared/constants/Vehicleratings';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  vr = VehicleRatings;
  likes_vr: any;
  dislikes_vr: any;
  
  constructor(private router: Router) {
  }
  vehicles = Vehicles
  currentVehicle: any;

  viewTimetable() {
    this.router.navigateByUrl('/timetable/'+this.currentVehicle.toString());
  }
  
  ngOnInit(): void {
    
    this.likes_vr = this.vr.sort(function(a, b) {
      
      if (a.likes < b.likes) return 1;
      if (a.likes > b.likes) return -1;
      return 0;
    });
    this.likes_vr = Object.assign([], this.likes_vr)
    this.dislikes_vr = this.vr.sort(function(a, b) {
      if (a.dislikes < b.dislikes) return 1;
      if (a.dislikes > b.dislikes) return -1;
      return 0;
    });
    this.dislikes_vr = Object.assign([], this.dislikes_vr)
  
  }

}
