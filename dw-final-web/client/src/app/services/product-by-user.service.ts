import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductByUser } from '../models/ProductByUser';

@Injectable({
  providedIn: 'root'
})
export class ProductByUserService {

  API_URI = 'http://localhost:8585/productByPerson/';

  constructor(private http: HttpClient) { }

  saveProductByUser(productByUser: ProductByUser) {
    return this.http.post(`${this.API_URI}`, productByUser);
  }

}
