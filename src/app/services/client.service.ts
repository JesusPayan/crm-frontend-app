import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  createNewClient(clientData: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/v1/clients/create_client', clientData);
  }
  getClients(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/v1/clients/get_clients');
  }
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:5000/v1/clients/delete_client_by_id/${id}`);
  }
  updateClient(clientData: FormData): Observable<any> {
    return this.http.put(`http://127.0.0.1:5000/v1/clients/update_client`, clientData);
  }    
}
