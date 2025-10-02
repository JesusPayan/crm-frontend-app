import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token'); // 👈 o tu lógica de sesión
    if (token) {
      return true;
    }

    // Si no hay token, regresar al login
    this.router.navigate(['/']);
    return false;
  }
}