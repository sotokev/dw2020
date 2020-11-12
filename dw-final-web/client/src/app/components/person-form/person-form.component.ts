import { Component, HostBinding, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { ActivatedRoute, Router } from "@angular/router";

import { PersonService } from "../../services/person.service";

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  person: Person = {
    birthDay: new Date(),
    direction: '',
    id: 0,
    identificationType: '',
    lastName: '',
    name: '',
    otherPhones: '',
    personalDocument: '',
    phoneNumber: ''
  };

  edit: boolean = false;

  constructor(private personService: PersonService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params.id){
      this.personService.getPerson(params.id)
        .subscribe(
          res=> {
            this.person = res;
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewPerson() {
    this.personService.savePerson(this.person)
      .subscribe(
        res => {
          this.route.navigate(['/person']);
        },
        err => console.error(err)
      )
  }

  updatePerson() {
    this.personService.updatePerson(this.person)
      .subscribe(
        res => {
          this.route.navigate(['/person']);
        },
        err => console.error(err)
      )
  }

}
