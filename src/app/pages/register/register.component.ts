import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../shared/services/authservice.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { confirmPasswordValidator } from './confirm-password.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup
  error: string = '';
  
  
  constructor(private authService: AuthService, private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: new FormControl('',{validators: [Validators.required, Validators.email], updateOn: 'blur'}),
      password: new FormControl('',{validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
      confirmPassword: new FormControl('',{validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur'}),
    });
    this.registerForm.setValidators(confirmPasswordValidator);
  }
  OnRegister() {
    console.warn(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.signup(this.registerForm.get('email')?.value!, this.registerForm.get('password')?.value!).then((cred) => {
      console.log(cred);
      const user: User = {
        id: cred.user?.uid as string,
        email: cred.user?.email!,
        username: this.registerForm.get('email')?.value!.split('@')[0]!,
        likes: Array<string>(),
        dislikes: Array<string>()
      } as User;
      console.log(user);
      this.userService.createUser(user).then(() => {
        console.log('User created:', user);
        this.router.navigateByUrl('main');
      }).catch(error => {
        this.error = error;
        console.error('Error creating user:', error.message);
      });
    }).catch(error => {
      this.error = error;
      console.log(this.error)
      console.error('Error signing up:', error.message);
    });
  }
}

