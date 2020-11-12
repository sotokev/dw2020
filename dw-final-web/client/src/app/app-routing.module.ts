import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonListComponent } from './components/person-list/person-list.component';
import { PersonFormComponent } from "./components/person-form/person-form.component";
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/person',
    pathMatch: 'full'
  }, 
  {
    path: 'person',
    component: PersonListComponent
  },
  {
    path: 'person/add',
    component: PersonFormComponent
  },
  {
    path: 'person/edit/:id',
    component: PersonFormComponent
  },
  {
    path: 'product',
    component: ProductListComponent
  },
  {
    path: 'product/add',
    component: ProductFormComponent
  },
  {
    path: 'product/edit/:id',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
