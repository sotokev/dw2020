import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonListComponent } from './components/person-list/person-list.component';

import { PersonService } from "./services/person.service";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductService } from "./services/product.service";
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ChartsModule } from "ng2-charts";
import { ProductUserComponent } from './components/product-user/product-user.component';
import { ProductByUserService } from './services/product-by-user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PersonFormComponent,
    PersonListComponent,
    ProductListComponent,
    ProductFormComponent,
    DashboardComponent,
    ProductUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    PersonService,
    ProductService,
    ProductByUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
