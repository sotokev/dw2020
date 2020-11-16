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

  getProductCount() {
    return this.http.get(`${this.API_URI}/count`);
  }

  public getProductNotification(): Observable<any> {

    return Observable.create((observer) => {

      const url: any = this.API_URI + '/notification/sse';

      const eventSource = new EventSource(url); 

      eventSource.onmessage = (event) => {
        console.log('Received event: ', event);
      };
      
      eventSource.addEventListener('product-result', function (event: any) {
        console.log('product-result call: ', event);
        observer.next(event.data);
      });

      eventSource.addEventListener('heartbeat-result', function (event) {
        console.log('eventSource.addEventListener: on heartbeat....');
      });

      return () => eventSource.close();
    });
  }

}
