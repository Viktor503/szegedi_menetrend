import { Component, Input } from '@angular/core';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/services/authservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  
  
  user = JSON.parse(localStorage.getItem('user')!);
  us?:User;
  email = '';
  constructor(private userservice: UserService, private authservice: AuthService, private router: Router) { }
  ngOnInit() {
    this.userservice.getById2(this.user.uid).pipe(first()).subscribe((user) => {
      this.us = user[0];
    });
  
  
  }
  deleteProfile(){
    this.authservice.deleteUser();
    this.userservice.delete(this.user.uid);
    this.router.navigateByUrl('/main');
  }
}
