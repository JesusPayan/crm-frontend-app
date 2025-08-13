import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})@Injectable({
  providedIn: 'root'
})
export class TransactionService {

constructor(private http: HttpClient) { }

getTransactions(): Observable<any> {
  return this.http.get('http://127.0.0.1:5000/v1/transactions/get_transactions');

}
}
