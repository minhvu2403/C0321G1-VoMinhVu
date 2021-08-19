import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractListComponent } from './contract-list/contract-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { ContractDetailComponent } from './contract-detail/contract-detail.component';


@NgModule({
  declarations: [ContractListComponent, ContractDetailComponent],
  exports: [
    ContractListComponent,
    ContractDetailComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ContractModule { }
