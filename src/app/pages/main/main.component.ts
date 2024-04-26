import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicles } from '../../shared/constants/Vehicles';
import { VehicleRatings } from '../../shared/constants/Vehicleratings';
import { BusmanagerService } from '../../shared/services/busmanager.service';
import { Route } from '../../shared/models/Route';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  vr? : Route[];
  likes_vr?: Route[];
  dislikes_vr?: Route[];
  
  constructor(private router: Router, private busmanagerService: BusmanagerService) {
  }
  vehicles = Vehicles
  currentVehicle: any;

  viewTimetable() {
    this.router.navigateByUrl('/timetable/'+this.currentVehicle.toString());
  }
  
  ngOnInit(): void {
    this.busmanagerService.getVehicles().pipe(first()).subscribe((vehicles) => {
      this.vr = vehicles;    
        this.likes_vr = this.vr.sort(function(a, b) {
          
          if (a[' likes'] < b[' likes']) return 1;
          if (a[' likes'] > b[' likes']) return -1;
          return 0;
        });
        this.likes_vr = this.likes_vr.slice(0, 10);
        this.likes_vr = Object.assign([], this.likes_vr)


        this.dislikes_vr = this.vr.sort(function(a, b) {
          if (a[' dislikes'] < b[' dislikes']) return 1;
          if (a[' dislikes'] > b[' dislikes']) return -1;
          return 0;
        });
        this.dislikes_vr = this.dislikes_vr.slice(0, 10);
        this.dislikes_vr = Object.assign([], this.dislikes_vr)
      });
  }

}
