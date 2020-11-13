import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Person } from "../models/person";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  API_URI = 'http://localhost:8585/persona/';

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get(`${this.API_URI}all`);
  }

  getPerson(id: string) {
    return this.http.get(`${this.API_URI}${id}`);
  }

  savePerson(person: Person) {
    return this.http.post(`${this.API_URI}`, person);
  }

  deletePerson(id: string) {
    return this.http.delete(`${this.API_URI}${id}`);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put(`${this.API_URI}`, person);
  }

  getCount() {
    return this.http.get(`${this.API_URI}count`);
  }

  public getPersonNotification(): Observable<any> {

    return Observable.create((observer) => {

      const url: any = this.API_URI + 'notification/sse';

      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        console.log('Received event: ', event);
      };
      
      eventSource.addEventListener('persona-result', function (event: any) {
        observer.next(event.data);
      });

      eventSource.addEventListener('heartbeat-result', function (event) {
        console.log('eventSource.addEventListener: on heartbeat....');
      });

      return () => eventSource.close();
    });
  }
}
