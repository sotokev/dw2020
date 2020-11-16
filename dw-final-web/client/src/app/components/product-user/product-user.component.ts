import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { Person } from 'src/app/models/person';
import { Product } from 'src/app/models/Product';
import { ProductByUser } from 'src/app/models/ProductByUser';
import { PersonService } from 'src/app/services/person.service';
import { ProductByUserService } from 'src/app/services/product-by-user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css']
})
export class ProductUserComponent implements OnInit {


  person: Person = {
    birthDay: new Date(),
    direction: '',
    id: 0,
    identificationType: '',
    lastName: '',
    name: '',
    otherPhones: '',
    personalDocument: '',
    phoneNumber: '',
    user: ''
  };

  product: Product = {
    id: 0,
    name: '',
    price: 0
  }

  productByPerson: ProductByUser = {
    id: 0,
    product: 0,
    person: 0
  }

  constructor(private personService: PersonService, private route: Router,
    private activatedRoute: ActivatedRoute, private productService: ProductService,
    private productByUserService: ProductByUserService) {
    this.mySubject = new BehaviorSubject(null);
    this.productSubject = new BehaviorSubject(null);
  }

  people: Number = 0;
  products: Number = 0;

  ngOnInit(): void {
    this.doNotificationSubscription();
    this.doSubjectSubscription();

    this.doProductNotificationSubscription();
    this.doProductSubjectSubscription();

    this.updateGraph();
  }

  saveNewPerson() {
    this.personService.savePerson(this.person)
      .subscribe(
        res => {
          console.log('User saved '+JSON.stringify(res));
        },
        err => console.error(err)
      )
  }

  saveNewProduct() {
    this.productService.saveProduct(this.product)
      .subscribe(
        res => {
          console.log('Product saved' + JSON.stringify(res));
        },
        err => console.error(err)
      )
  }

  saveProductByPerson() {
    this.productByUserService.saveProductByUser(this.productByPerson)
      .subscribe(
        res => {
          console.log('Product by user saved: '+JSON.stringify(res));
        },
        err => console.error(err)
      )
  }

  save() {
    this.saveNewPerson();
    this.saveNewProduct();

    this.productByPerson = {
      id: 0,
      product: this.person.id,
      person: this.product.id
    }

    this.saveProductByPerson();

    this.cleanData();

    this.updateGraph();
  }

  cleanData() {
    this.person = {
      birthDay: new Date(),
      direction: '',
      id: 0,
      identificationType: '',
      lastName: '',
      name: '',
      otherPhones: '',
      personalDocument: '',
      phoneNumber: '',
      user: ''
    };

    this.product = {
      id: 0,
      name: '',
      price: 0
    }

    this.productByPerson = {
      id: 0,
      product: 0,
      person: 0
    }
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }], yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Conteo general'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [this.people as number], label: 'Personas' },
    { data: [this.products as number], label: 'Productos' }
  ];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private mySubject: BehaviorSubject<any>;
  private productSubject: BehaviorSubject<any>;

  public doNotificationSubscription(): void {
    try {
      this.personService
        .getPersonNotification()
        .subscribe((result) => {

          console.log('Mensaje recibido:' + JSON.stringify(result));
          this.mySubject.next(result);

        });
    } catch (e) {
      console.log(e);
    }
  }

  public doProductNotificationSubscription(): void {
    try {
      this.productService.getProductNotification()
        .subscribe((result) => {
          console.log('Mensaje recibido desde producto:' + JSON.stringify(result));
          this.productSubject.next(result);
        });

    } catch (e) {
      console.log(e);
    }
  }

  public doSubjectSubscription(): void {
    this.mySubject.subscribe((result) => {
      console.log('actualizacion desde persona');
      this.updateGraph();
    });
  }

  public doProductSubjectSubscription(): void {
    this.productSubject.subscribe((result) => {
      console.log('actualizacion desde producto');
      this.updateGraph();
    });
  }

  public updateGraph(): void {
    console.log('updating graph');
    this.personService.getCount().subscribe(
      res => {
        this.people = res as Number;
      },
      err => console.error(err)
    )

    this.productService.getProductCount().subscribe(
      res => {
        this.products = res as Number;
      },
      err => console.error(err)
    )

    console.log('people length: ' + this.people);
    console.log('product list length: ' + this.products);
    this.barChartData[0].data = [this.people as number];
    this.barChartData[1].data = [this.products as number];
  }

}
