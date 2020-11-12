import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URI = 'http://localhost:8585/producto';

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get(`${this.API_URI}/all`);
  }

  getProduct(id: string) {
    return this.http.get(`${this.API_URI}/${id}`);
  }

  saveProduct(product: Product) {
    return this.http.post(`${this.API_URI}/`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put(`${this.API_URI}/`, product);
  }

}
