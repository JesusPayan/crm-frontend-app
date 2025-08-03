import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

   constructor(private http: HttpClient) { }

  createNewProduct(productData: FormData): Observable<any> {
      return this.http.post('http://127.0.0.1:5000/v1/products/create_product', productData);
  }
  getProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }
}
