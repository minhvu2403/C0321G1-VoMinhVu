import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [ServiceListComponent],
    exports: [
        ServiceListComponent
    ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class ServiceModule { }
