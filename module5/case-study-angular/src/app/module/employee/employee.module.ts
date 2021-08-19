import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [EmployeeListComponent, EmployeeCreateComponent],
  exports: [
    EmployeeListComponent,
    EmployeeCreateComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }
