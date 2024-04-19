import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/authservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  page = 'main';


  title = 'menetrend';
  ChangePage(selectedPage: string) {
    this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }
  loggedInUser?: firebase.default.User | null;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user;
      localStorage.setItem('user',JSON.stringify(user));
    },error => {
      console.error('Error getting user:',error);
      localStorage.setItem('user',JSON.stringify('null'));
    })
  }
  logout(_:boolean){
    console.log('Logging out');
    this.authService.logout().then(() => {
      console.log('Logged out');
      localStorage.removeItem('user');
      this.router.navigateByUrl('main');
    }).catch(error => {
      console.error('Error logging out:',error);
    });
  }

}

