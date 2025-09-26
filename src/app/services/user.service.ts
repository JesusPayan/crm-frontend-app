import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/v1/auth';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(this.apiUrl+'/register', userData);
  }
  login(userData: any) {
    return this.http.post(this.apiUrl+'/login', userData);
  }
}
