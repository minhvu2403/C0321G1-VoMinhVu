import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrderModule} from "ngx-order-pipe";


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
        FormsModule,
        OrderModule,

    ]
})
export class EmployeeModule { }
