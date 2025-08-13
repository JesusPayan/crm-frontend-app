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
    return this.http.get('http://127.0.0.1:5000/v1/products/get_products');
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:5000/v1/products/delete_product_by_id/${id}`);
  }
  getProductsSummary(): Observable<any> {
    return this.http.get('http://127.0.0.1:5000/v1/products/get_products_summary');
  }
  updateProduct(productData: FormData): Observable<any> {
    return this.http.put(`http://127.0.0.1:5000/v1/products/update_product`, productData);
  }
}
