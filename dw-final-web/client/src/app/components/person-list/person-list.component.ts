import { Component, HostBinding, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';

import { PersonService } from "../../services/person.service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  people: any = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.personService.getPersons().subscribe(
      res => {
        this.people = res;
      },
      err => console.error(err)
    )
  }

  deletePerson(id: string) {
    this.personService.deletePerson(id)
      .subscribe(
        res => {
          console.log(res);
          this.getPeople();
        },
        err => console.error(err)
      )
  }

}
