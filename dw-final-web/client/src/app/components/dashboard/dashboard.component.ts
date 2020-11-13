import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private personService: PersonService) { 
    this.mySubject = new BehaviorSubject(null);
  }

  people: any = [];
  products: any = [];

  ngOnInit(): void {
    this.doNotificationSubscription();

    // realizar subscription para subject (actualiza texto)
    this.doSubjectSubscription();

    this.updateGraph();
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Personas','Productos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [this.people.length], label: 'Personas' },
    { data: [0], label: 'Productos' }
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
      40 ];
  }

  public texto: String = 'empty';

  private mySubject: BehaviorSubject<any>;

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

  public doSubjectSubscription(): void {
    this.mySubject.subscribe((result) => {
      this.actualizarTexto(result);
    });
  }

  public actualizarTexto(result: any): void {
    this.texto = this.texto + ' ' + JSON.stringify(result);
    //actualizarGrafica() llame a la funcion reloadChart();
    this.updateGraph();
  }

  public updateGraph(): void{
    console.log('updating graph');
    this.personService.getPersons().subscribe(
      res => {
        this.people = res;
      },
      err => console.error(err)
    )

    console.log('people length: '+ this.people.length );
    this.barChartData[0].data = [ this.people.length ];
  }

}
