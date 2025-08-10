import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }
  getContracts_summary(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/v1/contracts/get_contracts_summary');
  }
  addContract(contractData: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/v1/contracts/create_contract', contractData);
  }

}
