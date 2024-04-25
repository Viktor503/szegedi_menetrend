import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TimeFormatPipe } from '../../shared/pipes/time-format.pipe';

@NgModule({
  declarations: [
    TimetableComponent
  ],
  providers: [
    TimeFormatPipe
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TimetableModule { }
