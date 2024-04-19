import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  user = JSON.parse(localStorage.getItem('user')!);
  email = '';
  constructor() { }
  ngOnInit() {
   console.log(this.user.email)
  }
}
