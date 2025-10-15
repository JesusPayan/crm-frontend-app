

// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   isLoggedIn(): boolean {
//     if (isPlatformBrowser(this.platformId)) {
//       return !!localStorage.getItem('token'); // o el token de Keycloak
//     }
//     return false;
//   }

//   logout() {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.removeItem('token');
//     }
//   }
// }

import { Injectable ,inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private router = inject(Router)
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable(); // Puedes suscribirte a esto desde cualquier componente
  public isLoggedIn = false;

  constructor() {
    this.isLoggedIn = this.hasToken();
  }

  private hasToken(): boolean {
    // if (!localStorage.getItem('access_token')) return false;
    // // return !!localStorage.getItem('access_token');
    // return true;
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return !!token;
  }

  loginSuccess() {
    this.loggedIn.next(true);
    this.isLoggedIn = true;
    // this.router.navigate(['/contract-component'], { queryParams: { showButtons: true } });
    this.router.navigate(['/home-component'], { queryParams: { showButtons: true } });
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.isLoggedIn = false;
    this.router.navigate(['/login-registry']);

  }
  setUserId(userId: string) {
    console.log("Guardando userId en el servicio AuthService:", userId);
    localStorage.setItem('user_id', userId);
  }
  getUserId(): string | null {
    const userId = localStorage.getItem('user_id');
    console.log("Obteniendo userId del servicio AuthService:", userId);
    // alert("Obteniendo userId del servicio AuthService: " + userId);
    return userId;
  }
}


