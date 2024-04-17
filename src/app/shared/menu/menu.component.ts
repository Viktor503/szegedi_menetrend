import { Component, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  links = ['main', 'timetable','news','about'];
  
  linkNames: Map<string, string>;

  constructor() {
    this.linkNames = new Map<string, string>();
    this.linkNames.set('main', 'Főoldal');
    this.linkNames.set('timetable', 'Menetrend');
    this.linkNames.set('news', 'Hírek');
    this.linkNames.set('about', 'Rólunk');
  }

  ngOnInit() {
    
  }
}
