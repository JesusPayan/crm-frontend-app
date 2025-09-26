import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-login-registry',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule],
  templateUrl: './login-registry.component.html',
  styleUrl: './login-registry.component.css'
})
export class LoginRegistryComponent {
  //declaramos variables
  user = {  email: '', password: '', phone: '' };
  form!: FormGroup;
  mode: 'login' | 'register' = 'login'; // por defecto login
  response: any;
  private router = inject(Router)
  constructor(private fb: FormBuilder,private userService: UserService) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      ...(this.mode === 'register' && {
        name: ['', Validators.required], // solo para registro
        confirmPassword: ['', Validators.required],
      })
    });
}
switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.buildForm();
  }

  onSubmit() {
    //console.log(this.mode);
    // alert(this.mode)
    const newContract = new FormData();

    if (this.mode === 'login') {
      console.log('Login:', this.form.value);
      // aquí llamas a tu servicio de login
      this.userService.login(this.user).subscribe((data) => {
      console.log(data),
      this.response = data;
      alert(this.response.message);
      if(this.response.success){
        //redireccionar a dashboard
        this.router.navigate(['/dashboard-component']);
      }
    });
    } else {
      console.log('Registro:', this.form.value);
      // aquí llamas a tu servicio de registro
      this.userService.register(this.user).subscribe((data) => {
      console.log(data),
      this.response = data;  
      alert(this.response.message);
      this.switchMode('login');
      
    });
    }
  }
}
