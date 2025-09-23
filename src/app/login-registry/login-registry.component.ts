import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-registry',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login-registry.component.html',
  styleUrl: './login-registry.component.css'
})
export class LoginRegistryComponent {

  
  form!: FormGroup;
  mode: 'login' | 'register' = 'login'; // por defecto login

  constructor(private fb: FormBuilder) {
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
    alert(this.mode)
    if (this.form.invalid) return;

    if (this.mode === 'login') {
      console.log('Login:', this.form.value);
      // aquí llamas a tu servicio de login
    } else {
      console.log('Registro:', this.form.value);
      // aquí llamas a tu servicio de registro
    }
  }
}
