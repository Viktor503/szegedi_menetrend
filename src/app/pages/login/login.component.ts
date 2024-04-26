import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { AuthService } from '../../shared/services/authservice.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fg = new FormGroup({
    email : new FormControl('',{validators: [Validators.required, Validators.email]}),
    password : new FormControl('',{validators:[Validators.required, Validators.minLength(6)]})
  });
  error:string = '';
  
  
  constructor(private authService: AuthService, private router: Router) { }
  async login(){
    if(this.fg.get("email")?.invalid){
      this.error = 'Invalid email';
      
    }
    if(this.fg.get("password")?.invalid){
      this.error = 'Invalid password';
    }
    this.authService.login(this.fg.get("email")?.value!,this.fg.get("password")?.value!).then((cred) => {
      this.router.navigateByUrl('/main');
    }).catch(error =>{
      this.error = 'Incorrenct email or password';
    })
  }
}
