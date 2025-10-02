import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any) {
    return this.http.post(this.apiUrl+'/register', userData);
  }
  login(userData: any) {
    console.log("Informacion que llega al servicio de login",userData);
    return this.http.post(this.apiUrl+'/login', userData);
  }
  // getToken(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token; // true si existe token
  // }
  // setToken() {
  //   localStorage.setItem('token', 'fake-jwt-token');
  // }

  logout() {
    alert("Cerrando sesión"+ localStorage.getItem('access_token')  );
    this.router.navigate(['/login']);
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }
}
