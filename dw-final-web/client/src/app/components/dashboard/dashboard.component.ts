import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private personService: PersonService, private productService: ProductService) {
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

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
  }

  public texto: String = 'empty';

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
      this.actualizarTexto(result);
    });
  }

  public doProductSubjectSubscription(): void {
    this.productSubject.subscribe((result) => {
      console.log('actualizacion desde producto');
      this.actualizarTexto(result);
    });
  }

  public actualizarTexto(result: any): void {
    this.texto = this.texto + ' ' + JSON.stringify(result);
    this.updateGraph();
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
