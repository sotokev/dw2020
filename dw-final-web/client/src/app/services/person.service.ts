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
}
