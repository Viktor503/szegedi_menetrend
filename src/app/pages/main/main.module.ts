import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select'; 
import { MatFormField } from '@angular/material/select';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table'; 
import { VehicleRatings } from '../../shared/constants/Vehicleratings';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatSelectModule,
    MatFormField,
    FormsModule,
    MatCardModule,
    MatTableModule
  ]
})
export class MainModule{ 

}
