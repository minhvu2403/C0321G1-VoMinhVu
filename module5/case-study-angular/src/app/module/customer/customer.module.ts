import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerRoutingModule} from './customer-routing.module';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerEditComponent} from './customer-edit/customer-edit.component';
import {CustomerCreateComponent} from './customer-create/customer-create.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CustomerListComponent, CustomerEditComponent, CustomerCreateComponent],
  exports: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomerModule {
}
