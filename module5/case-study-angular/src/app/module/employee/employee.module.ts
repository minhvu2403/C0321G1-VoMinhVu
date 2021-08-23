import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [EmployeeListComponent],
  exports: [
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,

  ]
})
export class EmployeeModule { }
