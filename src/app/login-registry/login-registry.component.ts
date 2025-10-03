import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormsModule,FormControl,ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-registry',
  standalone: true,
  imports: [NgIf,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login-registry.component.html',
  styleUrl: './login-registry.component.css'
})
export class LoginRegistryComponent {
  //declaramos variables
  user = {  email: '', password: '', phone: '' };
  form!: FormGroup;
  mode: 'login' | 'register' = 'login'; // por defecto login
  response: any;
  typePassword: string = 'password';
  email = new FormControl('');
  password = new FormControl('');
  private router = inject(Router)
  constructor(private fb: FormBuilder,private userService: UserService , private authService: AuthService) {
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

    if (this.mode === 'login') {
      console.log('Login:', this.form.value);
      this.userService.login(this.user).subscribe({
        next: (data) => {
          this.response = data;
          console.log("Informacion que llega del backend",this.response);
          alert(this.response.message);
          
          localStorage.setItem('access_token', this.response.access_token);
          localStorage.setItem('user_id', this.response.user_id);
          localStorage.setItem('token', 'true');
          this.authService.loginSuccess();//notifica que el login fue exitoso
          this.authService.setUserId(this.response.backend_user_id);
          // redirigir a la página protegida
          // this.router.navigate(['/contract-component'], { queryParams: { showButtons: true } });
        },
        error: (err) => {
          console.error('Error en login', err);
          alert("Error en login: " + err.error);
        }
      });  
    } else {
      console.log('Registro:', this.form.value);
      // aquí llamas a tu servicio de registro
      this.userService.register(this.user).subscribe(
        (data) => {
          console.log(data),
          this.response = data;  
          alert(this.response.message);
          this.switchMode('login');
    });
    }
  }
  togglePasswordVisibility() {
    if (this.typePassword === 'password') {
      this.typePassword = 'text';
    } else {
      this.typePassword = 'password';
    }
  }
}
